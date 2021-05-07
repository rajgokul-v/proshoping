import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import colors from 'colors'
import products from './data/products.js '

dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
	res.send('hello world')
})
app.get('/api/products', (req, res) => {
	res.json(products)
})
app.get('/api/products/:id', (req, res) => {
	const product = products.find((p) => p._id === req.params.id)
	res.json(product)
})
const PORT = process.env.PORT || 5000
app.listen(
	PORT,
	console.log(
		`server running ${process.env.NODE_ENV} on  port ${PORT}`.yellow.bold
	)
)
