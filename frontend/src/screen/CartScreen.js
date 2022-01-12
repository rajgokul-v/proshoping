import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Button,
	Card,
	ListGroupItem
} from 'react-bootstrap'
import { addToCart } from '../components/redux/action/cartAction'

import Message from '../components/Message'

const CartScreen = ({ match, location, history }) => {
	const productId = match.params.id

	const qty = location.search ? Number(location.search.split('=')[1]) : 1
	const cart = useSelector((state) => state?.cart)
	const { cartItems } = cart
	const dispatch = useDispatch()
	useEffect(() => {
		console.log(productId)
		if (productId) {
			dispatch(addToCart(productId, qty))
		}
	}, [dispatch, productId, qty])

	const removeFromCartHandler = () => {
		console.log('remove')
	}

	return (
		<>
			<Row>
				<Col md={8}>
					<h1>Shoping Cart</h1>
					{cartItems.length === 0 ? (
						<Message>
							Your cart ia empty <Link to="/">Go Back</Link>
						</Message>
					) : (
						<ListGroup variant="flush">
							{cartItems.map((item) => (
								<ListGroupItem key={item.product}>
									<Row>
										<Col md={2}>
											<Image src={item.image} alt={item.name} fluid rounded />
										</Col>
										<Col md={3}>
											<Link to={`/product/${item.product}`}>{item.name}</Link>
										</Col>
										<Col md={2}>{`$${item.price}`}</Col>
										<Col md={2}>
											<Form.Control
												as="select"
												value={item.qty}
												onChange={(e) =>
													dispatch(
														addToCart(item.product, Number(e.target.value))
													)
												}
											>
												{[...Array(item.countInStock).keys()].map((x) => (
													<option key={x + 1} value={x + 1}>
														{x + 1}
													</option>
												))}
											</Form.Control>
										</Col>
										<Col md={2}>
											<Button
												type="button"
												variant="light"
												onClick={removeFromCartHandler(item.product)}
											>
												<i className="fas fa-trash" />
											</Button>
										</Col>
									</Row>
								</ListGroupItem>
							))}
						</ListGroup>
					)}
				</Col>
				<Col md={2}></Col>
				<Col md={2}></Col>
			</Row>
		</>
	)
}

export default CartScreen
