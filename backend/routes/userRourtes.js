import express from 'express'
const router = express.Router()

import { userAuth } from '../controller/userController.js'

router.post('/login', userAuth)
export default router
