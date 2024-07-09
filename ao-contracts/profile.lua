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

if not Profile then Profile = {} end
if not Assets then Assets = {} end

Handlers.add('Register-Profile', Handlers.utils.hasMatchingTag('Action', 'Register-Profile'),
  function(msg)
    return msg.Action == "Register"
  end,
  function(msg)
    local query = string.format([[SELECT COUNT(*) as count FROM Users WHERE PID = "%s";]], msg.From)
    local userCount = 0
    for row in db:nrows(query) do
      userCount = row.count
    end

    if userCount > 0 then
      Send({ Target = msg.From, Action = "Registered", Data = "Already Registered" })
      print("User already registered")
      return "Already Registered"
    end

    local insert_query = string.format([[
            INSERT INTO Users (PID, wallet_address, username, profile_img, bio) VALUES ("%s", "%s", "%s", "%s", "%s");
        ]], msg.From, msg.wallet_address, msg.username or 'anon', msg.profile_img or '', msg.bio or '')
    dbAdmin:exec(insert_query)

    Send({
      Target = msg.From,
      Action = "Register-Profile",
      Data = "Successfully Registered."
    })
    print("Registered " .. (msg.username or "anon"))
  end
)

Handlers.add('get-profile-by-wallet-address', Handlers.utils.hasMatchingTag('Action', 'get-profile-by-wallet-address'),
  function(msg)
    -- Query to get the user profile by wallet_address
    local query = string.format([[SELECT * FROM Users WHERE wallet_address = "%s";]], msg.wallet_address)
    local profile = nil
    for row in db:nrows(query) do
      profile = {
        PID = row.PID,
        wallet_address = row.wallet_address,
        username = row.username,
        profile_img = row.profile_img,
        bio = row.bio
      }
    end

    if profile then
      local profile_json = json.encode(profile)
      Send({
        Target = msg.From,
        Action = "get-profile-by-wallet-address",
        Data = profile_json
      })
      print("Profile found for wallet_address: " .. profile_json)
    else
      Send({
        Target = msg.From,
        Action = "get-profile-by-wallet-address",
        Data = "Profile not found"
      })
      print("Profile not found for wallet_address: " .. msg.wallet_address)
    end
  end
)

Handlers.add('update-profile', Handlers.utils.hasMatchingTag('Action', 'update-profile'),
  function(msg)
    local updates = {}
    Send({
      Target = msg.From,
      Action = "update-profile",
      Data = "Profile update failed: "
    })
    print("Update Profile");
    print(msg);
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

      if result == sqlite3.OK then
        Send({
          Target = msg.From,
          Action = "update-profile",
          Data = "Profile updated successfully."
        })
        print("Profile updated for wallet_address: " .. msg.wallet_address)
      else
        Send({
          Target = msg.From,
          Action = "update-profile",
          Data = "Profile update failed: " .. err
        })
        print("Profile update failed for wallet_address: " .. msg.wallet_address .. " Error: " .. err)
      end
    else
      Send({
        Target = msg.From,
        Action = "update-profile",
        Data = "No updates provided."
      })
      print("No updates provided for wallet_address: " .. msg.wallet_address)
    end
  end
)

Handlers.add("assetX.Users", function(msg)
    return msg.Action == "UserList"
  end,
  function(msg)
    local authors = dbAdmin:exec([[SELECT PID FROM Users]])
    print("Listing " .. #authors .. " authors")
    Send({ Target = msg.From, Action = "assetx.Users", Data = require('json').encode(authors) })
  end
)
