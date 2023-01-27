const mongoose = require("mongoose")

const schema = mongoose.Schema

const subcategorySchema = new schema({
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  subcategory: {
    type: String,
  },
});

module.exports = mongoose.model('Subcategory', subcategorySchema)