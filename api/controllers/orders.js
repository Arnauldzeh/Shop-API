const mongoose = require("mongoose");
const Orders = require("../models/order");
const Product = require("../models/product");

const getOrders = async (req, res, next) => {
  try {
    const fetchedOrders = await Orders.find()
      .select("product quantity _id")
      .populate("product", "name price");
    res.status(200).json({
      TotalOrders: fetchedOrders.length,
      fetchedOrders,
    });
  } catch (error) {
    next(error);
  }
};

const newOrder = async (req, res, next) => {
  try {
    const { quantity, productId } = req.body;

    // Validate input
    if (!quantity || !productId) {
      const error = new Error(
        "Missing required fields: quantity and productId"
      );
      error.status = 400;
      throw error;
    }
    // Check if product exists
    const productExists = await Product.findById(productId);
    if (!productExists) {
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }
    // Create a new order
    const order = new Orders({
      _id: new mongoose.Types.ObjectId(),
      product: productId,
      quantity: quantity,
    });

    // Save the order and wait for the result
    const result = await order.save();

    // Respond with the created order
    res.status(201).json({
      message: "Order created successfully",
      order: result,
      id: result._id,
    });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const id = req.params.orderId;

    // Find order by ID
    const order = await Orders.findById(id)
      .select("product quantity _id")
      .populate("product");

    // Check if order exists
    if (!order) {
      const error = new Error("Order not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      message: "Order fetched successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const id = req.params.orderId;

    // Find and delete order by ID
    const result = await Orders.findByIdAndDelete(id);

    // Check if the order was found and deleted
    if (!result) {
      const error = new Error("Order not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      message: "Order deleted successfully",
      id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getOrders, getOrderById, newOrder, deleteOrder };
