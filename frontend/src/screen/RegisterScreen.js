import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loading from '../components/Loading'

import { register } from '../redux/action/userLoginAction'
import FormContainer from '../components/FormContainer'
import { toast } from 'react-toastify'

const RegisterScreen = ({ location, history }) => {
	const [name, setName] = useState()
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const [confrimPassword, setConfrimPassword] = useState()
	const [message, setMessage] = useState()

	const dispatch = useDispatch()

	const userRegister = useSelector((state) => state.userRegister)
	const { loading, error, userInfo } = userRegister

	const redirect = location.search ? location.search.split('=')[1] : '/'

	useEffect(() => {
		if (userInfo) {
			history.push(redirect)
			toast('Register successfully...')
		}
	}, [history, userInfo, redirect])

	const submitHandler = (e) => {
		e.preventDefault()
		if (password !== confrimPassword) {
			setMessage('Password  do not match')
		} else {
			dispatch(register(name, email, password))
		}
	}
	return (
		<FormContainer>
			<h1>Sign Up</h1>
			{message && <Message variant="danger" Children={message} />}
			{error && <Message variant="danger" Children={error} />}
			{loading && <Loading />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="name">
					<Form.Label>Name</Form.Label>
					<FormControl
						type="name"
						placeholder="Enter your name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Group>

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

				<Form.Group controlId="ConfrimPassword">
					<Form.Label>Confrim password</Form.Label>
					<FormControl
						type="Password"
						placeholder="Enter your ConfrimPassword"
						value={confrimPassword}
						onChange={(e) => setConfrimPassword(e.target.value)}
					/>
				</Form.Group>

				<Button type="submit" varient="primary">
					Sign Up
				</Button>
			</Form>
			<Row className="py-3">
				<Col>
					Have an Account ?{' '}
					<Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>
						Log in
					</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default RegisterScreen
