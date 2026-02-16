const { docClient, TABLE_NAME } = require("../config/dynamodb.js");
const {
  PutCommand,
  ScanCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");

// Tạo sản phẩm mới
exports.createProduct = async (product) => {
  const params = {
    TableName: TABLE_NAME,
    Item: product,
  };
  await docClient.send(new PutCommand(params));
  return product;
};

// Lấy tất cả sản phẩm
exports.getAllProducts = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const data = await docClient.send(new ScanCommand(params));
  return data.Items || [];
};

// Lấy sản phẩm theo ID
exports.getProductById = async (productId) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      productId: productId,
    },
  };
  const data = await docClient.send(new GetCommand(params));
  return data.Item;
};

// Cập nhật sản phẩm
exports.updateProduct = async (productId, productData) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      productId: productId,
    },
    UpdateExpression:
      "set #name = :name, price = :price, quantity = :quantity, updatedAt = :updatedAt",
    ExpressionAttributeNames: {
      "#name": "name",
    },
    ExpressionAttributeValues: {
      ":name": productData.name,
      ":price": productData.price,
      ":quantity": productData.quantity,
      ":updatedAt": new Date().toISOString(),
    },
    ReturnValues: "ALL_NEW",
  };
  const data = await docClient.send(new UpdateCommand(params));
  return data.Attributes;
};

// Xóa sản phẩm
exports.deleteProduct = async (productId) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      productId: productId,
    },
  };
  await docClient.send(new DeleteCommand(params));
  return true;
};
