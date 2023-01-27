const express = require('express')
const router = express.Router()

//controller
const thousandController = require("./../controller/thousand")

router.get("/thousand", thousandController.thousand);

module.exports = router