const express = require('express')
const multer = require('multer')

const app = express()

const route = express.Router()

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

//controller calling
const categoryController = require('./../../controller/admin/category')

//Setting up routes
route.get('/add-category', categoryController.getAddCategory)
route.get('/view-category', categoryController.getViewCategory)
route.get('/delete-category/:id', categoryController.getDeleteController)
route.get('/edit-category/:id', categoryController.getEditCategory)

route.post("/add-category", filehandler, categoryController.postAddCategory);
route.post('/edit-category/:id', filehandler, categoryController.postEditCategory)


module.exports = route