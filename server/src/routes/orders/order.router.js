const express = require('express')
const {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders, 
    getOrders} = require('./order.controller')
const { protect , admin} = require('../../middleware/authMiddleware')

const orderRouter = express.Router()

orderRouter
.route('/')
.post(protect, addOrderItems)
.get(protect, admin, getOrders)
orderRouter.route('/myorders').get(protect, getMyOrders)
orderRouter.route('/:id').get(protect, getOrderById)
orderRouter.route('/:id/pay').put(protect, updateOrderToPaid)


module.exports = { orderRouter };