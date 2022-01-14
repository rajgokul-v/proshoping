import express from 'express'
const router = express.Router()

import { getProfile, userAuth } from '../controller/userController.js'
import { prodect } from '../middleware/authMiddleware.js'

router.post('/login', userAuth)
router.route('/profile').get(prodect, getProfile)
export default router
