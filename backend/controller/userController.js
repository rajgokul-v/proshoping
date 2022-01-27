import asyncHandler from 'express-async-handler'

import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @desc    login user
// @route   /api/users/login
// @access  public

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
		res.status(404)
		throw new Error('Invalid or incorrect password')
	}
})

// @desc    register user
// @route   /api/users
// @access  public

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body

	const userExist = await User.findOne({ email })
	if (userExist) {
		res.status(400)
		throw new Error('User already exits')
	}

	const user = await User.create({ name, email, password })
	if (user) {
		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id)
		})
	} else {
		res.status(401)
		throw new Error('Invalid user data')
	}
})

// @desc    getprofile user
// @route   /api/users/getprofile
// @access  public

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
		res.status(404)
		throw new Error('User not found')
	}
})

export { userAuth, registerUser, getProfile }
