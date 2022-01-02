import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'

import { listProductDetail } from '../components/redux/action/productaction'

const ProductScreen = ({ match }) => {
	const dispatch = useDispatch()
	const productsDetail = useSelector((state) => state.productDetail)
	console.log(productsDetail)
	useEffect(() => {
		dispatch(listProductDetail(match.params.id))
	}, [dispatch, match])
	const product = {}
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
