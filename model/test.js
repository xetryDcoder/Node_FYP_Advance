const mongoose = require('mongoose')

const schema = mongoose.Schema

const categorySchema = new schema({
    category_name: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Category", categorySchema);