require("dotenv").config();
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

// Cấu hình DynamoDB Client từ biến môi trường
const client = new DynamoDBClient({
  region: process.env.DYNAMODB_REGION || "us-west-2",
  endpoint: process.env.DYNAMODB_ENDPOINT || "http://localhost:8000",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "local",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "local",
  },
});

// Tạo Document Client để dễ dàng làm việc với DynamoDB
const docClient = DynamoDBDocumentClient.from(client);

// Export cả client và table name
module.exports = {
  docClient,
  dynamoDBClient: client,
  TABLE_NAME: process.env.DYNAMODB_TABLE_NAME || "Products",
};
