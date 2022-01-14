import asyncHandler from 'express-async-handler'
import Jwt from 'jsonwebtoken'

import User from '../models/userModel.js'

const prodect = asyncHandler(async (req, res, next) => {
	let token
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1]

			const decoded = Jwt.verify(token, process.env.JWT_SECERT)

			req.user = await User.findById(decoded.id).select('-password')

			next()
		} catch (error) {
			console.log(error)
			res.status(401)
			throw new Error('not authorization,token failed')
		}
	}
	if (!token) {
		res.status(401)
		throw new Error('No authorization,no token')
	}
})

export { prodect }
