import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import Message from '../components/Message'
import Loading from '../components/Loading'

import { login } from '../redux/action/userLoginAction'
import FormContainer from '../components/FormContainer'

const LoginScreen = ({ location, history }) => {
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()

	const dispatch = useDispatch()

	const userLogin = useSelector((state) => state.userLogin)
	const { loading, error, userInfo } = userLogin

	const redirect = location.search ? location.search.split('=')[1] : '/'

	useEffect(() => {
		if (userInfo) {
			history.push(redirect)
		}
	}, [history, userInfo, redirect])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(login(email, password))
	}
	return (
		<FormContainer>
			<h1>Sign In</h1>
			{error && <Message variant="danger" Children={error} />}
			{loading && <Loading />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="email">
					<Form.Label>Email</Form.Label>
					<FormControl
						type="email"
						placeholder="Enter your email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>

				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<FormControl
						type="password"
						placeholder="Enter your password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>

				<Button type="submit" varient="primary">
					Sign In
				</Button>
			</Form>
			<Row className="py-3">
				<Col>
					New Customer ?{' '}
					<Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>
						Register
					</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default LoginScreen
