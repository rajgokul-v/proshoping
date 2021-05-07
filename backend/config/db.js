import Mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async () => {
	try {
		const conn = await Mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true
		})
		console.log(`MongoDB Connected:${conn.connection.host}`.cyan.underline)
	} catch (error) {
		console.error(`Error:${error.message}`.red.underline)
		process.exit(1)
	}
}

export default connectDB
