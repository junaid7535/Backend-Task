import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    productId: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    }
  });
  
const orderSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
      default: 'user_1'
    },
    items: {
      type: [orderItemSchema],
      required: true,
    },
},{timestamps : true})

const order = mongoose.model('order',orderSchema);

export default order;