const express = require('express');
const { addOrderItems, getOrderById } = require('./order.controller')
const protect = require('../../middleware/authMiddleware')

const orderRouter = express.Router();

orderRouter.route('/').post(protect, addOrderItems);
orderRouter.route('/:id').get(protect, getOrderById);


module.exports = { orderRouter };