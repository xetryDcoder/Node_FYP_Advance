const mongoose = require("mongoose");

const schema = mongoose.Schema;

const productSchema = new schema({
  category: {
    type: String,
    required: true, 
  },
},{
    timestamps: true,
});

module.exports = mongoose.model("Product", productSchema);
