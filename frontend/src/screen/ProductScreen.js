import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'

const ProductScreen = ({ match }) => {
	const [product, setProduct] = useState([])

	useEffect(() => {
		const fetchProduct = async () => {
			const { data } = await axios.get(`/api/products/${match.params.id}`)
			console.log(data)

			setProduct(data)
		}
		fetchProduct()
	}, [match])

	return (
		<>
			<Link to="/" className="btn btn-light my-3">
				Go back
			</Link>
			<Row>
				<Col md={6}>
					<Image src={product.image} alt={product.image} fluid />
				</Col>
				<Col md="3">
					<ListGroup varient="flush">
						<ListGroup.Item>
							<strong> {product.name}</strong>
						</ListGroup.Item>

						<ListGroup.Item>
							price :<h3>${product.price}</h3>
						</ListGroup.Item>

						<ListGroup.Item>
							<Rating
								value={product.rating}
								text={`${product.numReviews} reviews`}
							/>
						</ListGroup.Item>

						<ListGroup.Item>Description : {product.description}</ListGroup.Item>
					</ListGroup>
				</Col>

				<Col md={3}>
					<Card>
						<ListGroup varient="flush">
							<ListGroup.Item>
								<Row>
									<Col>Price :</Col>
									<Col>
										<h3>${product.price}</h3>
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Status :</Col>
									<Col>
										{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}{' '}
									</Col>
								</Row>
							</ListGroup.Item>
						</ListGroup>

						<Col>
							<Button
								className=" btn-block "
								type="button"
								disabled={product.countInStock === 0}
							>
								Add In Card
							</Button>
						</Col>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default ProductScreen
