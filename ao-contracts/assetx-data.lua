local json = require('json')
local sqlite3 = require('lsqlite3')
db = db or sqlite3.open_memory()
dbAdmin = require('@rakis/DbAdmin').new(db)

ATOMIC_ASSETS = [[
  CREATE TABLE IF NOT EXISTS Assets (
    PID TEXT PRIMARY KEY,
    Owner TEXT,
    OwnerId TEXT,
    Username TEXT,
    Content_Type Text
  );
]]

function InitDb()
    db:exec(ATOMIC_ASSETS)
    return dbAdmin:tables()
end

InitDb()

-- Add-Asset Handler
Handlers.add("AssetX.Add",
    function(msg)
        return msg.Action == "Add"
    end,
    function(msg)
        local assetCount = #dbAdmin:exec(
            string.format([[SELECT * FROM Assets WHERE PID = "%s";]], msg.PID)
        )
        if assetCount > 0 then
            Send({ Target = msg.From, Action = "AssetX.Added", Data = "Asset Already Exists" })
            print("Asset already exists")
            return "Asset Already Exists"
        end
        dbAdmin:exec(string.format([[
      INSERT INTO Assets (PID, Owner, OwnerId, Username, Content_Type) VALUES ("%s", "%s", "%s", "%s", "%s");
    ]], msg.PID, msg.Owner, msg.OwnerId, msg.Username or 'anon', msg.Content_Type or ''))
        Send({
            Target = msg.From,
            Action = "AssetX.Added",
            Data = "Asset Successfully Added."
        })
    end
)

Handlers.add("AssetX.ListAllAssets", function(msg)
        return msg.Action == "ListAllAssets"
    end,
    function(msg)
        local assets = {}
        for row in db:nrows([[SELECT * FROM Assets]]) do
            table.insert(assets, {
                PID = row.PID,
                Owner = row.Owner,
                OwnerId = row.OwnerId,
                Username = row.Username,
                Content_Type = row.Content_Type
            })
        end
        local assets_json = json.encode(assets)
        print("Listing all assets: " .. assets_json)
        Send({ Target = msg.From, Action = "AssetX.ListAllAssets", Data = assets_json })
    end
)
