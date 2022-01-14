import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const userAuth = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })
	const match = await user.matchPassword(password)
	console.log(match)

	if (user && (await user.matchPassword(password))) {
		res.send({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: null
		})
	} else {
		res.status(401)
		throw new Error('Invalid or incorrect password')
	}
})

export { userAuth }
