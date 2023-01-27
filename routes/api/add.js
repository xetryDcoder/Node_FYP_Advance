const express = require('express')
const router = express.Router()

const app = express()

//controller
const addController = require("./../../controller/api/add")

router.post('/add', addController.postAdd)

module.exports = router
