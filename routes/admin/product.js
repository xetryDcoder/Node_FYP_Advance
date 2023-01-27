const express = require("express");
const multer = require('multer')

const router = express.Router();

const app = express();

/* start file handling  */
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
        );
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

let filehandler = app.use(
    multer({
        storage: fileStorage,
        fileFilter: fileFilter
    }).single("image")
);
/* end file handling  */

//middleware
const authMiddleware = require('./../../middleware/auth/verifyLogin')

//controller
const productController = require("./../../controller/admin/product");

router.get("/all-products", authMiddleware, productController.allProducts)
router.get("/add-product", authMiddleware, productController.getAddProduct);
router.get("/edit-product/:id", authMiddleware, productController.getEditProduct)

router.post("/add-product", authMiddleware, filehandler, productController.postProduct)
router.post("/edit-product/:id", authMiddleware, productController.postEditProduct)

module.exports = router;
