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
