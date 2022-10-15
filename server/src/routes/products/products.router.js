const express = require('express');
const { getProducts, getProductById, deleteProduct } = require('./product.controller')
const { protect, admin } = require('../../middleware/authMiddleware')

const productsRouter = express.Router();

productsRouter.get('/', getProducts);

productsRouter
    .route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)

module.exports = { productsRouter };