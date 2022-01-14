import asyncHandler from 'express-async-handler'

import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

const userAuth = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })

	if (user && (await user.matchPassword(password))) {
		res.send({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id)
		})
	} else {
		res.status(401)
		throw new Error('Invalid or incorrect password')
	}
})

const getProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)

	if (user) {
		res.send({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin
		})
	} else {
		res.status(401)
		throw new Error('User not found')
	}
})

export { userAuth, getProfile }
