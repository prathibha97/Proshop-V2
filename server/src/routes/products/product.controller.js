const asyncHandler = require('express-async-handler');
const Product = require('../../models/Product')

// @desc   Fetch all products
// @route  Get /v1/api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products);
})

// @desc   Fetch a single product
// @route  Get /v1/api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.status(200).json(product);
    }
    else {
        res.status(404);
        throw new Error('Product not found');
    }
})

// @desc   Delete a product
// @route  Delete /api/v1/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.remove()
        res.json({ message: 'Product deleted' })
    }
    else {
        res.status(404);
        throw new Error('Product not found');
    }
})

module.exports = { getProducts, getProductById, deleteProduct }