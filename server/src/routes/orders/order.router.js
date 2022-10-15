const express = require('express');
const { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders } = require('./order.controller')
const protect = require('../../middleware/authMiddleware')

const orderRouter = express.Router();

orderRouter.route('/').post(protect, addOrderItems);
orderRouter.route('/myorders').get(protect, getMyOrders);
orderRouter.route('/:id').get(protect, getOrderById);
orderRouter.route('/:id/pay').put(protect, updateOrderToPaid);


module.exports = { orderRouter };