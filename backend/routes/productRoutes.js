import express from 'express'
const router = express.Router()
import { getProducts, getProductById, 
    createProduct, updateProduct, 
    deleteProduct, createProductReview, 
    getTopProducts} from '../controllers/productController.js'
import checkObjectId from '../middleware/checkObjectId.js'

//bring in protect and admin middleware
import {protect, admin} from '../middleware/authMiddleware.js'

router.route('/').get(getProducts)
    .post(protect, admin, createProduct)
router.get('/top', getTopProducts)

//all routes below are on /api/products
router.route('/:id').get(checkObjectId, getProductById)
    .put(protect, admin, checkObjectId, updateProduct)
    .delete(protect, admin, checkObjectId, deleteProduct)
router.route('/:id/reviews').post(protect, checkObjectId, createProductReview)


export default router;

