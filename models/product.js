import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,

  },
  price: {
    type: Number,
    required: true,
  },
  sizes: [{
    size: {
      type: String,
      required: true, 
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,

    }
  }],
  
},{timestamps:true});

const product = mongoose.model('product',ProductSchema);

export default product;