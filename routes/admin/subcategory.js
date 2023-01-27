const express = require('express')
const multer = require('multer')

const app = express()

const route = express.Router()



//controller calling
const subcategoryController = require('./../../controller/admin/subcategory')

//Setting up routes
route.get('/add-subcategory', subcategoryController.getAddSubcategory)
route.get('/view-subcategory', subcategoryController.getViewSubcategory)
route.get('/delete-subcategory/:id', subcategoryController.getDeleteController)
route.get('/edit-subcategory/:id', subcategoryController.getEditSubcategory)

route.post("/add-subcategory", subcategoryController.postAddSubcategory);
route.post('/edit-subcategory/:id', subcategoryController.postEditSubcategory)


module.exports = route