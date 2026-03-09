const express = require("express");
const router = express.Router();
const controller = require("../controllers/studentController.js");

router.get("/", controller.index);
router.post("/add", controller.create);
router.delete("/delete/:id", controller.delete);

module.exports = router;
