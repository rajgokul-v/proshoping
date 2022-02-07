import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Loading from '../components/Loading'
import Rating from '../components/Rating'
import Message from '../components/Message'

import { listProductDetail } from '../redux/action/productAction'

const ProductScreen = ({ history, match }) => {
	const [qty, setQty] = useState(0)
	const dispatch = useDispatch()
	const productDetail = useSelector((state) => state.productDetail)
	const products = productDetail?.product
	const loading = productDetail?.loading
	const error = productDetail?.error

	useEffect(() => {
		dispatch(listProductDetail(match.params.id))
	}, [dispatch, match])

	const addToCartHandler = (e) => {
		e.preventDefault()
		return history.push(`/cart/${match.params.id}?qty=${qty}`)
	}
	return (
		<>
			<Link to="/" className="btn btn-light my-3">
				Go back
			</Link>
			{loading ? (
				<Loading />
			) : error ? (
				<Message varient="danger" Children={error}>
					{error}
				</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image src={products?.image} alt={products?.image} fluid />
					</Col>
					<Col md="3">
						<ListGroup varient="flush">
							<ListGroup.Item>
								<strong> {products?.name}</strong>
							</ListGroup.Item>

							<ListGroup.Item>
								price :<h3>{`$${products?.price}`}</h3>
							</ListGroup.Item>

							<ListGroup.Item>
								<Rating
									value={products?.rating}
									text={`${products?.numReviews} reviews`}
								/>
							</ListGroup.Item>

							<ListGroup.Item>
								Description : {products?.description}
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
											<h3>{`$${products?.price}`}</h3>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status :</Col>
										<Col>
											{products?.countInStock > 0 ? 'In Stock' : 'Out of Stock'}{' '}
										</Col>
									</Row>
								</ListGroup.Item>
								{products?.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Qty</Col>
											<Col>
												<Form.Control
													as="select"
													value={qty}
													onChange={(e) => setQty(e.target.value)}
												>
													{[...Array(products?.countInStock).keys()].map(
														(x) => (
															<option key={x + 1} value={x + 1}>
																{x + 1}
															</option>
														)
													)}
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
									disabled={products?.countInStock === 0}
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
