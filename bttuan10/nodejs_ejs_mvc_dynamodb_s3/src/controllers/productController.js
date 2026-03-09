const productModel = require("../models/productModel.js");
const { s3 } = require("../config/aws.js");

// lấy key từ url ảnh S3
function getKeyFromUrl(url) {

    if (!url) return null;

    const parts = url.split("/");

    return parts[parts.length - 1];
}

// ================= LIST =================
exports.listProducts = async(req, res) => {

    const products = await productModel.getAll();

    res.render("index", { products, keyword: "" });

};

// ================= SHOW ADD =================
exports.showAdd = (req, res) => {

    res.render("add");

};

// ================= ADD PRODUCT =================
exports.addProduct = async(req, res) => {

    try {

        const { productId, name, price, quantity } = req.body;

        let imageUrl = "";

        if (req.file) {

            const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: Date.now() + "_" + req.file.originalname,
                Body: req.file.buffer,
                ContentType: req.file.mimetype
            };

            const upload = await s3.upload(params).promise();

            imageUrl = upload.Location;

        }

        const product = {
            productId,
            name,
            image: imageUrl,
            price: parseFloat(price),
            quantity: parseInt(quantity)
        };

        await productModel.create(product);

        res.redirect("/");

    } catch (err) {

        console.log(err);

        res.send("Add product failed");

    }

};

// ================= SHOW EDIT =================
exports.showEdit = async(req, res) => {

    const product = await productModel.getById(req.params.id);

    res.render("edit", { product });

};

// ================= UPDATE PRODUCT =================
exports.updateProduct = async(req, res) => {

    try {

        const { productId, name, price, quantity, oldImage } = req.body;

        let imageUrl = oldImage;

        if (req.file) {

            // upload ảnh mới
            const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: Date.now() + "_" + req.file.originalname,
                Body: req.file.buffer,
                ContentType: req.file.mimetype
            };

            const upload = await s3.upload(params).promise();

            imageUrl = upload.Location;

            // xóa ảnh cũ trên S3
            const oldKey = getKeyFromUrl(oldImage);

            if (oldKey) {

                await s3.deleteObject({
                    Bucket: process.env.S3_BUCKET_NAME,
                    Key: oldKey
                }).promise();

            }

        }

        const product = {
            productId,
            name,
            image: imageUrl,
            price: parseFloat(price),
            quantity: parseInt(quantity)
        };

        await productModel.update(product);

        res.redirect("/");

    } catch (err) {

        console.log(err);

        res.send("Update failed");

    }

};

// ================= DELETE PRODUCT =================
exports.deleteProduct = async(req, res) => {

    try {

        const product = await productModel.getById(req.params.id);

        if (product && product.image) {

            const key = getKeyFromUrl(product.image);

            if (key) {

                await s3.deleteObject({
                    Bucket: process.env.S3_BUCKET_NAME,
                    Key: key
                }).promise();

            }

        }

        await productModel.delete(req.params.id);

        res.redirect("/");

    } catch (err) {

        console.log(err);

        res.send("Delete failed");

    }

};

// ================= SEARCH =================
exports.searchProduct = async(req, res) => {

    const keyword = (req.query.keyword || "").toLowerCase();

    const products = await productModel.getAll();

    const result = products.filter(p =>
        p.name.toLowerCase().includes(keyword)
    );

    res.render("index", { products: result, keyword });

};