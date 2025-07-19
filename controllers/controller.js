import Product from "../models/product.js"
import Order from "../models/order.js";

export const createProduct = async(req,res)=>{
    
    try {
        const { name, price, sizes } = req.body;

        const newProduct = new Product({
            name,
            price,
            sizes
        });

        await newProduct.save();

        res.status(201).json({success: true, id : newProduct._id });

    } catch (error) {
  
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getOrder = async(req,res) => {
    try {
        const { userId, items } = req.body;
    
        if (!items || items.length === 0) {
          return res.status(400).json({ error: 'Order items are required' });
        }
    
        const newOrder = new Order({
          userId,
          items
        });
    
        const savedOrder = await newOrder.save();
    
        res.status(201).json({ success: true, orderId: savedOrder._id });
    
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getAllProducts = async (req, res) => {
  try {
    const { name, size, limit = 10, offset = 0 } = req.query;


    const filter = {};
    if (name) {
      filter.name = { $regex: name, $options: 'i' }; 
    }
    if (size) {
      filter.size = size;
    }

    const products = await Product.find(filter)
      .skip(Number(offset))
      .limit(Number(limit))
      .select('name price'); 

    const total = await Product.countDocuments(filter); 

    const next = (Number(offset) + Number(limit)) < total ? Number(offset) + Number(limit) : null;
    const previous = Number(offset) - Number(limit) >= 0 ? Number(offset) - Number(limit) : null;

    res.json({
      data: products,
      page: {
        next,
        previous,
        limit: Number(limit),
        total,
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const getAllOrder = async (req, res) => {
    try {
      const { user_id } = req.params;
      const limit = parseInt(req.query.limit) || 10;
      const offset = parseInt(req.query.offset) || 0;
  
      const orders = await Order.find({ userId: user_id })
        .skip(offset)
        .limit(limit);
  
      const enrichedOrders = orders.map(order => ({
        id: order._id,
        items: order.items.map(item => ({
          productDetails: {
            name: "Sample Product", 
            id: item.productId
          },
          qty: item.qty
        })),
        total: order.items.reduce((sum, item) => sum + (item.qty * 50), 0)
      }));
  
      res.status(200).json({
        data: enrichedOrders,
        page: {
          next: offset + limit,
          limit: orders.length,
          previous: Math.max(offset - limit, 0),
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };
  