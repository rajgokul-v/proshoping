import Mongoose from 'Mongoose'

const userSchema = Mongoose.Schema(
	{
		name: {
			type: String,
			require: true,
			unique: true
		},
		password: {
			type: String,
			require: true
		},
		isAdmin: {
			type: Boolean,
			require: true,
			default: false
		}
	},
	{
		timestamps: true
	}
)

const user = Mongoose.model('user ', userSchema)

export default user
