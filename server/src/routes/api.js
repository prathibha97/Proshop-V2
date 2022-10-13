const express = require('express');
const {productsRouter} = require('./products/products.router');
const {userRouter} = require('./users/user.route');

const api = express.Router();

api.use('/products', productsRouter);
api.use('/users', userRouter);

module.exports = api;