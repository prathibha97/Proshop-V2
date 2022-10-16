const express = require('express');
const {
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct,
    createProduct ,
    createProductReview
} = require('./product.controller')
const { protect, admin } = require('../../middleware/authMiddleware')

const productsRouter = express.Router();

productsRouter
    .route('/')
    .get(getProducts)
    .post(protect, admin, createProduct)

productsRouter.route('/:id/reviews').post(protect, createProductReview)

productsRouter
    .route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct)

module.exports = { productsRouter };