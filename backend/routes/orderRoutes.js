import express from 'express'
const router = express.Router()

import { addOrderItems } from '../controller/orderController.js'
import { prodect } from '../middleware/authMiddleware.js'

router.route('/').post(prodect, addOrderItems)

export default router
