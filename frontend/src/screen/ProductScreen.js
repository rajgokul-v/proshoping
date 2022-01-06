import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Loading from '../components/Loading'
import Rating from '../components/Rating'

const ProductScreen = ({ history, match }) => {
	const [qty, setQty] = useState(0)
	const [product, setProduct] = useState({})
	const [loading, setLodaing] = useState(true)
	useEffect(() => {
		const fetchProductDetail = async () => {
			const productsDetail = await axios.get(`/api/products/${match.params.id}`)
			setLodaing(false)
			setProduct(productsDetail.data)
		}
		fetchProductDetail()
	}, [match])

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`)
	}
	return (
		<>
			<Link to="/" className="btn btn-light my-3">
				Go back
			</Link>
			{loading ? (
				<Loading />
			) : (
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
								price :<h3>{`$${product.price}`}</h3>
							</ListGroup.Item>

							<ListGroup.Item>
								<Rating
									value={product.rating}
									text={`${product.numReviews} reviews`}
								/>
							</ListGroup.Item>

							<ListGroup.Item>
								Description : {product.description}
							</ListGroup.Item>
						</ListGroup>
					</Col>

					<Col md={3}>
						<Card>
							<ListGroup varient="flush">
								<ListGroup.Item>
									<Row>
										<Col>Price :</Col>
										<Col>
											<h3>{`$${product.price}`}</h3>
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
								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Qty</Col>
											<Col>
												<Form.Control
													as="select"
													value={qty}
													onChange={(e) => setQty(e.target.value)}
												>
													{[...Array(product.countInStock).keys()].map((x) => (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													))}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}
							</ListGroup>
							<Col>
								<Button
									onClick={addToCartHandler}
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
			)}
		</>
	)
}

export default ProductScreen
