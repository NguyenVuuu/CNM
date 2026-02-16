require('dotenv').config();
const { CreateTableCommand, ListTablesCommand } = require("@aws-sdk/client-dynamodb");
const { dynamoDBClient, TABLE_NAME } = require("../src/config/dynamodb");

async function initDatabase() {
  try {
    console.log('🔍 Checking if table exists...');
    
    // Kiểm tra xem table đã tồn tại chưa
    const listTablesCommand = new ListTablesCommand({});
    const tables = await dynamoDBClient.send(listTablesCommand);
    
    if (tables.TableNames && tables.TableNames.includes(TABLE_NAME)) {
      console.log(`✅ Table "${TABLE_NAME}" already exists!`);
      return;
    }
    
    console.log(`📦 Creating table "${TABLE_NAME}"...`);
    
    // Tạo table mới
    const createTableCommand = new CreateTableCommand({
      TableName: TABLE_NAME,
      KeySchema: [
        { AttributeName: "productId", KeyType: "HASH" } // Partition key
      ],
      AttributeDefinitions: [
        { AttributeName: "productId", AttributeType: "S" } // S = String
      ],
      BillingMode: "PAY_PER_REQUEST" // On-demand billing
    });
    
    await dynamoDBClient.send(createTableCommand);
    
    console.log(`✅ Table "${TABLE_NAME}" created successfully!`);
    console.log('🎉 Database initialization completed!');
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
}

// Chạy script
initDatabase();

