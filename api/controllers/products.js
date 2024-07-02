const Product = require("../models/product");
const mongoose = require("mongoose");

const getProducts = async (req, res, next) => {
  try {
    const fetchedProducts = await Product.find();
    res.status(200).json({
      Totalproducts: fetchedProducts.length,
      products: fetchedProducts,
    });
  } catch (error) {
    next(error);
  }
};

const newProduct = async (req, res, next) => {
  console.log(req.file);
  try {
    const { name, price } = req.body;

    // Validate input
    if (!name || !price) {
      const error = new Error("Missing required fields: name and price");
      error.status = 400;
      throw error;
    }

    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      price: price,
      productImage: req.file.path,
    });

    // Save the product and wait for the result
    const result = await product.save();

    res.status(201).json({
      message: "Product created successfully",
      product: result,
      id: result._id,
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const id = req.params.productId;
    if (id) {
      const fetchedProduct = await product.findById(id);
      if (!fetchedProduct) {
        const error = new Error("Product not found");
        error.status = 404;
        throw error;
      }
      res.status(200).json({
        message: "Product fetched successfully",
        product: fetchedProduct,
      });
    } else {
      const error = new Error("Invalid product ID");
      error.status = 400;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

const editProduct = async (req, res, next) => {
  try {
    const id = req.params.productId;
    const updates = req.body;

    // Validate that the id is provided
    if (!id) {
      const error = new Error("Product ID is required");
      error.status = 400;
      throw error;
    }

    // Find the product by ID and update it
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
    });

    // Check if the product was found and updated
    if (!updatedProduct) {
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.productId;

    // Check if the product ID is provided
    if (!id) {
      const error = new Error("Product ID is required");
      error.status = 400;
      throw error;
    }

    // Find and delete the product by ID
    const result = await Product.findByIdAndDelete(id);

    // Check if the product was found and deleted
    if (!result) {
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      message: "Product deleted successfully",
      id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  newProduct,
  getProductById,
  editProduct,
  deleteProduct,
};
