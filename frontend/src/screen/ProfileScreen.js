import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loading from '../components/Loading'

import {
	getUserDetails,
	updateUserProfile
} from '../redux/action/userLoginAction'

const ProfileScreen = ({ location, history }) => {
	const [name, setName] = useState()
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const [confrimPassword, setConfrimPassword] = useState()
	const [message, setMessage] = useState()

	const dispatch = useDispatch()

	const userDetails = useSelector((state) => state.userDetails)
	const { loading, error, user } = userDetails

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin
	console.log(userInfo)

	const userUpdateProfile = useSelector((state) => state?.userUpdateProfile)
	const { success } = userUpdateProfile
	useEffect(() => {
		if (!userInfo) {
			history.push('/login')
		} else {
			if (!user?.name) {
				dispatch(getUserDetails('profile'))
			} else {
				setName(user?.name)
				setEmail(user?.email)
			}
		}
	}, [dispatch, history, userInfo, user])

	const submitHandler = (e) => {
		e.preventDefault()
		if (password !== confrimPassword) {
			setMessage('Password  do not match')
		} else {
			dispatch(updateUserProfile({ id: user._id, name, email, password }))
		}
	}
	return (
		<Row>
			<Col md={3}>
				<h1>User profile</h1>
				{message && <Message variant="danger" Children={message} />}
				{error && <Message variant="danger" Children={error} />}
				{}
				{success && (
					<Message variant="success" Children={'Profile Updated'}>
						Profile Updated
					</Message>
				)}
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
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>MY Order</h2>
			</Col>
		</Row>
	)
}

export default ProfileScreen
