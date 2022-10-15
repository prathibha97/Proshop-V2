const express = require('express');
const {productsRouter} = require('./products/products.router');
const {userRouter} = require('./users/user.router');
const {orderRouter} = require('./orders/order.router');

const api = express.Router();

api.use('/products', productsRouter);
api.use('/users', userRouter);
api.use('/orders', orderRouter);
api.get('/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))


module.exports = api;