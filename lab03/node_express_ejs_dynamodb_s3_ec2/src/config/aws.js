const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');
const { S3Client } = require('@aws-sdk/client-s3');

// Cấu hình AWS Region
const REGION = process.env.AWS_REGION || 'us-east-1';

// Tạo DynamoDB Client
const dynamoDBClient = new DynamoDBClient({
    region: REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

// Tạo DynamoDB Document Client (dễ sử dụng hơn)
const docClient = DynamoDBDocumentClient.from(dynamoDBClient);

// Tạo S3 Client
const s3Client = new S3Client({
    region: REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

// Cấu hình tên bảng và bucket
const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'Products';
const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'products-img-lab03';

module.exports = {
    docClient,
    s3Client,
    TABLE_NAME,
    BUCKET_NAME,
    REGION
};

