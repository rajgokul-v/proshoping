import React from 'react'
import {Button, Card, Col, Form, Image, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import Message from "./Message";
import {Link} from "react-router-dom";
import {addToCart, removeFromCart} from "./redux/action/cartAction";
import {useDispatch} from "react-redux";

const Cart = ({ cartItems,history }) => {

    const dispatch = useDispatch()

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }
	return (
		<>
		<Row>
			<Col md={8}>
				<h1>Shoping Cart</h1>
				{cartItems.length === 0 && (
					<Message Children={'Your cart is empty'}>
						Your cart is empty <Link to="/">Go Back</Link>
					</Message>
				)}
				{cartItems.length > 0 && (
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
											onClick={() => removeFromCartHandler(item.product)}
										>
											<i className="fas fa-trash"></i>
										</Button>
									</Col>
								</Row>
							</ListGroupItem>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant="flush">
						<ListGroupItem>
							<h2>
								Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
								) Items
							</h2>
							{`$`}
							{cartItems
								.reduce((acc, item) => acc + item.qty * item.price, 0)
								.toFixed(2)}
						</ListGroupItem>
						<ListGroupItem>
							<Button
								type="button"
								className="btn-block"
								disabled={cartItems.length === 0}
								onClick={checkoutHandler}
							>
								Procceed to checkout
							</Button>
						</ListGroupItem>
					</ListGroup>
				</Card>
			</Col>
			<Col md={2}></Col>
		</Row>
		</>
	)
}

export default Cart
