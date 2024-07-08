local sqlite3 = require('lsqlite3')
db = db or sqlite3.open_memory()
dbAdmin = require('@rakis/DbAdmin').new(db)

return "OK"

-- Function to execute SQL
local function execute_sql(sql)
    db:exec(sql)
end

-- Function to create a table with dynamic columns
local function create_table_with_columns(conn, table_name, columns)
    local columns_sql = {}
    for _, column in ipairs(columns) do
        table.insert(columns_sql, column.name .. " " .. column.type)
    end
    local create_table_sql = string.format("CREATE TABLE IF NOT EXISTS %s (%s)", table_name, table.concat(columns_sql, ", "))
    execute_sql(create_table_sql)
end

-- Static USERS table creation SQL
local USERS = [[
  CREATE TABLE IF NOT EXISTS Users (
    PID TEXT PRIMARY KEY,
    Name TEXT
  );
]]

-- Dynamic columns for the DATA table
local data_columns = {
    {name = "ID", type = "TEXT PRIMARY KEY"},
    {name = "PID", type = "TEXT"},
    {name = "Data", type = "TEXT"},
    {name = "created_at", type = "DATETIME DEFAULT CURRENT_TIMESTAMP"},
    {name = "updated_at", type = "DATETIME DEFAULT CURRENT_TIMESTAMP"},
    {name = "FOREIGN KEY (PID)", type = "REFERENCES Users(PID)"}
}

-- Initialize the database
function InitDb()
    execute_sql(USERS) -- Create static USERS table
    create_table_with_columns(db, "Data", data_columns) -- Create dynamic DATA table
    return dbAdmin:tables()
end

-- Example usage
return InitDb()

Handlers.add("inter.Register",
  function (msg)
    return msg.Action == "Register"
  end,
  function (msg)
    -- get author count to make sure author is not already registered
    local authorCount = #dbAdmin:exec(
      string.format([[select * from Users where PID = "%s";]], msg.From)
    )
    if authorCount > 0 then
      Send({Target = msg.From, Action = "Registered", Data = "Already Registered"})
      print("Author already registered")
      return "Already Registered"
    end
    local Name = msg.Name or 'anon'
    dbAdmin:exec(string.format([[
      INSERT INTO Users (PID, Name) VALUES ("%s", "%s");
    ]], msg.From, Name))
    Send({
      Target = msg.From,
      Action = "sidehunt.Registered",
      Data = "Successfully Registered."
    })
    print("Registered " .. Name)
  end 
)

Handlers.add("addData",
    Handlers.utils.hasMatchingTag("Action", "AddData"),
    function (msg)
        print("Adding data for PID:", msg.PID)
        local userCount = dbAdmin:exec(
            string.format([[SELECT * FROM Users WHERE PID = "%s";]], msg.PID)
        )
        if #userCount == 0 then
            Send({Target = msg.From, Action = "AddData", Data = "User does not exist"})
            print("User does not exist")
            return "User does not exist"
        else
            local insert_data_sql = string.format([[INSERT INTO Data (ID, PID, Data) VALUES ("%s", "%s", "%s");]], msg.ID, msg.PID, msg.Data)
            execute_sql(insert_data_sql)
            Send({Target = msg.From, Action = "AddData", Data = "Data added successfully"})
            print("Data added successfully")
            return "Data added successfully"
        end
    end
)