import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
	console.log('product', product)
	return (
		<Card className="my-3 py-3 rounded">
			<Link to={`/product/${product._id}`}>
				<Card.Img src={product.image} variant="top" />
			</Link>
			<Card.Body className="text-center">
				<Link to={`/product/${product._id}`}>
					<b>{product.name}</b>
				</Link>
				<Card.Text as="div">
					<Rating
						value={product.rating}
						text={`${product.numReviews} reviews`}
					/>
				</Card.Text>
				<Card.Text as="h3">${product.price}</Card.Text>
			</Card.Body>
		</Card>
	)
}

export default Product
