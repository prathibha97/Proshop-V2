const express = require('express');
const { addOrderItems } = require('./order.controller')
const protect  = require('../../middleware/authMiddleware')

const orderRouter = express.Router();

orderRouter.route('/').post(protect, addOrderItems);

module.exports = {orderRouter};