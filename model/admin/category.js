const mongoose = require("mongoose")

const schema = mongoose.Schema

const categorySchema = new schema({
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    }
})

module.exports = mongoose.model('Category', categorySchema)