const AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-southeast-1",
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

const TABLE = "Students";

exports.getAll = async () => {
  const params = { TableName: TABLE };
  const data = await dynamodb.scan(params).promise();
  return data.Items;
};

exports.create = async (student) => {
  const params = {
    TableName: TABLE,
    Item: student,
  };
  return dynamodb.put(params).promise();
};

exports.delete = async (id) => {
  const params = {
    TableName: TABLE,
    Key: { id },
  };
  return dynamodb.delete(params).promise();
};
