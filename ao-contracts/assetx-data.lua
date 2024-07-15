local json = require('json')
local sqlite3 = require('lsqlite3')
db = db or sqlite3.open_memory()
dbAdmin = require('@rakis/DbAdmin').new(db)

USERS = [[
  CREATE TABLE IF NOT EXISTS Users (
    PID TEXT PRIMARY KEY,
    wallet_address TEXT,
    username TEXT,
    profile_img TEXT,
    bio TEXT
  );
]]

function InitDb()
    db:exec(USERS)
    return dbAdmin:tables()
end

InitDb()

Handlers.add("AssetX.Register",
    function(msg)
        return msg.Action == "Register"
    end,
    function(msg)
        -- get user count
        local userCount = #dbAdmin:exec(
            string.format([[select * from Users where PID = "%s";]], msg.From)
        )
        if userCount > 0 then
            Send({ Target = msg.From, Action = "Registered", Data = "Already Registered" })
            print("User already registered")
            return "Already Registered"
        end
        dbAdmin:exec(string.format([[
      INSERT INTO Users (PID, wallet_address, username, profile_img, bio) VALUES ("%s", "%s", "%s", "%s", "%s");
    ]], msg.From, msg.wallet_address, msg.username or 'anon', msg.profile_img or '', msg.bio or ''))
        Send({
            Target = msg.From,
            Action = "AssetX.Registered",
            Data = "Successfully Registered."
        })
        print("Registered " .. msg.username or "anon")
    end
)

Handlers.add('AssetX.get-profile-by-wallet-address',
    function(msg)
        return msg.Action == "get-profile-by-wallet-address"
    end,
    function(msg)
        local query = "SELECT * FROM Users WHERE wallet_address = ?;"
        local profile = nil

        local stmt = db:prepare(query)
        if stmt then
            stmt:bind_values(msg.wallet_address)
            for row in stmt:nrows() do
                profile = {
                    PID = row.PID,
                    wallet_address = row.wallet_address,
                    username = row.username,
                    profile_img = row.profile_img,
                    bio = row.bio
                }
            end
            stmt:finalize()
        else
            print("Failed to prepare statement for wallet_address: " .. msg.wallet_address)
        end

        if profile then
            local profile_json = json.encode(profile)
            Send({
                Target = msg.From,
                Action = "AssetX.get-profile-by-wallet-address",
                Data = profile_json
            })
            print("Profile found for wallet_address: " .. profile_json)
        else
            Send({
                Target = msg.From,
                Action = "AssetX.get-profile-by-wallet-address",
                Data = json.encode({ error = "Profile not found" })
            })
            print("Profile not found for wallet_address: " .. msg.wallet_address)
        end
    end
)

Handlers.add('AssetX.update-profile',
    function(msg)
        return msg.Action == "update-profile"
    end,
    function(msg)
        local updates = {}
        print("Update Profile")
        print(json.encode(msg))
        if msg.username then
            table.insert(updates, string.format('username = "%s"', msg.username))
        end
        if msg.profile_img then
            table.insert(updates, string.format('profile_img = "%s"', msg.profile_img))
        end
        if msg.bio then
            table.insert(updates, string.format('bio = "%s"', msg.bio))
        end
        if #updates > 0 then
            local update_query = string.format([[
        UPDATE Users SET %s WHERE wallet_address = "%s";
      ]], table.concat(updates, ', '), msg.wallet_address)

            local result, err = dbAdmin:exec(update_query)

            if result then
                Send({
                    Target = msg.From,
                    Action = "AssetX.update-profile",
                    Data = "Profile updated successfully."
                })
                print("Profile updated for wallet_address: " .. msg.wallet_address)
            else
                Send({
                    Target = msg.From,
                    Action = "AssetX.update-profile",
                    Data = "Profile update failed: " .. (err or "unknown error")
                })
                print("Profile update failed for wallet_address: " ..
                    msg.wallet_address .. " Error: " .. (err or "unknown error"))
            end
        else
            Send({
                Target = msg.From,
                Action = "AssetX.update-profile",
                Data = "No updates provided."
            })
            print("No updates provided for wallet_address: " .. msg.wallet_address)
        end
    end
)
