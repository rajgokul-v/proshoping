import express from 'express'
const router = express.Router()

import {
	getUserProfile,
	registerUser,
	updateUserProfile,
	userAuth
} from '../controller/userController.js'
import { prodect } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)
router.post('/login', userAuth)
router
	.route('/profile')
	.get(prodect, getUserProfile)
	.put(prodect, updateUserProfile)
export default router
