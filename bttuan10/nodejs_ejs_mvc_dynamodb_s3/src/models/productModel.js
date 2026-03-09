const { dynamodb } = require("../config/aws.js");

const TABLE = process.env.DYNAMODB_TABLE_NAME;

exports.getAll = async() => {
    const params = {
        TableName: TABLE
    };

    const data = await dynamodb.scan(params).promise();
    return data.Items;
};

exports.create = async(product) => {
    const params = {
        TableName: TABLE,
        Item: product
    };

    return dynamodb.put(params).promise();
};

exports.getById = async(id) => {
    const params = {
        TableName: TABLE,
        Key: {
            productId: id
        }
    };

    const data = await dynamodb.get(params).promise();
    return data.Item;
};

exports.update = async(product) => {
    const params = {
        TableName: TABLE,
        Item: product
    };

    return dynamodb.put(params).promise();
};

exports.delete = async(id) => {
    const params = {
        TableName: TABLE,
        Key: {
            productId: id
        }
    };

    return dynamodb.delete(params).promise();
};