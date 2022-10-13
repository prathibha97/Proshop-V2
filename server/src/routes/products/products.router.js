const express = require('express');
const { getProducts, getProductById } = require('./product.controller')

const productsRouter = express.Router();


productsRouter.get('/', getProducts);

productsRouter.get('/:id', getProductById);

module.exports = { productsRouter };