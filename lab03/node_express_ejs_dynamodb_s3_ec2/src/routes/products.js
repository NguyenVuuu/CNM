const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const {
  PutCommand,
  GetCommand,
  ScanCommand,
  UpdateCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");
const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const {
  docClient,
  s3Client,
  TABLE_NAME,
  BUCKET_NAME,
  REGION,
} = require("../config/aws");

// Cấu hình multer để upload file vào memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // Giới hạn 5MB
  },
});

// GET: Hiển thị danh sách sản phẩm
router.get("/", async (req, res) => {
  try {
    const params = {
      TableName: TABLE_NAME,
    };

    const data = await docClient.send(new ScanCommand(params));
    res.render("products/index", { products: data.Items || [] });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Error fetching products: " + error.message);
  }
});

// GET: Hiển thị form thêm sản phẩm
router.get("/add", (req, res) => {
  res.render("products/add");
});

// POST: Thêm sản phẩm mới
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const productId = uuidv4();
    const { name, price, quantity } = req.body;

    let url_image = null;

    // Upload ảnh lên S3 nếu có
    if (req.file) {
      const imageKey = `products/${productId}-${Date.now()}-${req.file.originalname}`;

      const uploadParams = {
        Bucket: BUCKET_NAME,
        Key: imageKey,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };

      await s3Client.send(new PutObjectCommand(uploadParams));
      url_image = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${imageKey}`;
    }

    // Lưu thông tin sản phẩm vào DynamoDB
    const params = {
      TableName: TABLE_NAME,
      Item: {
        productId,
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        url_image,
        createdAt: new Date().toISOString(),
      },
    };

    await docClient.send(new PutCommand(params));
    res.redirect("/products");
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send("Error adding product: " + error.message);
  }
});

// GET: Hiển thị form chỉnh sửa sản phẩm
router.get("/edit/:id", async (req, res) => {
  try {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        productId: req.params.id,
      },
    };

    const data = await docClient.send(new GetCommand(params));

    if (!data.Item) {
      return res.status(404).send("Product not found");
    }

    res.render("products/edit", { product: data.Item });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send("Error fetching product: " + error.message);
  }
});

// POST: Cập nhật sản phẩm
router.post("/edit/:id", upload.single("image"), async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, price, quantity } = req.body;

    // Lấy thông tin sản phẩm hiện tại
    const getParams = {
      TableName: TABLE_NAME,
      Key: { productId },
    };
    const currentProduct = await docClient.send(new GetCommand(getParams));

    let url_image = currentProduct.Item?.url_image;

    // Upload ảnh mới lên S3 nếu có
    if (req.file) {
      // Xóa ảnh cũ nếu có
      if (url_image) {
        const oldKey = url_image.split(".com/")[1];
        await s3Client.send(
          new DeleteObjectCommand({
            Bucket: BUCKET_NAME,
            Key: oldKey,
          }),
        );
      }

      const imageKey = `products/${productId}-${Date.now()}-${req.file.originalname}`;

      const uploadParams = {
        Bucket: BUCKET_NAME,
        Key: imageKey,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };

      await s3Client.send(new PutObjectCommand(uploadParams));
      url_image = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${imageKey}`;
    }

    // Cập nhật thông tin sản phẩm trong DynamoDB
    const updateParams = {
      TableName: TABLE_NAME,
      Key: { productId },
      UpdateExpression:
        "set #name = :name, price = :price, quantity = :quantity, url_image = :url_image, updatedAt = :updatedAt",
      ExpressionAttributeNames: {
        "#name": "name",
      },
      ExpressionAttributeValues: {
        ":name": name,
        ":price": parseFloat(price),
        ":quantity": parseInt(quantity),
        ":url_image": url_image,
        ":updatedAt": new Date().toISOString(),
      },
    };

    await docClient.send(new UpdateCommand(updateParams));
    res.redirect("/products");
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Error updating product: " + error.message);
  }
});

// POST: Xóa sản phẩm
router.post("/delete/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    // Lấy thông tin sản phẩm để xóa ảnh trên S3
    const getParams = {
      TableName: TABLE_NAME,
      Key: { productId },
    };
    const data = await docClient.send(new GetCommand(getParams));

    // Xóa ảnh trên S3 nếu có
    if (data.Item?.url_image) {
      const imageKey = data.Item.url_image.split(".com/")[1];
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: BUCKET_NAME,
          Key: imageKey,
        }),
      );
    }

    // Xóa sản phẩm trong DynamoDB
    const deleteParams = {
      TableName: TABLE_NAME,
      Key: { productId },
    };

    await docClient.send(new DeleteCommand(deleteParams));
    res.redirect("/products");
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send("Error deleting product: " + error.message);
  }
});

module.exports = router;
