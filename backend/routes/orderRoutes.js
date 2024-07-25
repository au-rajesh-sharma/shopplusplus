import express from 'express'
const router = express.Router()
import {addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, 
    updateOrderToDelivered, getOrders} from '../controllers/orderController.js'

import {protect, admin} from '../middleware/authMiddleware.js'

// all routes connected to '/api/orders'
router.route('/').post(protect, addOrderItems)
    .get(protect, admin, getOrders)//protect for logged in admin users
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default router;