import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'

import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/action/userLoginAction'

const Header = () => {
	const dispatch = useDispatch()

	const userlogin = useSelector((state) => state.userLogin)
	const { userInfo } = userlogin

	const logoutHandler = () => {
		dispatch(logout())
	}
	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Container>
				<LinkContainer to="/">
					<Navbar.Brand>Proshop</Navbar.Brand>
				</LinkContainer>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto">
						<LinkContainer to="/cart">
							<Nav.Link>
								<i className="fas fa-shopping-cart" />
								Cart
							</Nav.Link>
						</LinkContainer>
						{userInfo ? (
							<NavDropdown title={userInfo.name}>
								<LinkContainer to="/profile">
									<NavDropdown.Item>Profile</NavDropdown.Item>
								</LinkContainer>
								<NavDropdown.Item onClick={logoutHandler}>
									Log Out
								</NavDropdown.Item>
							</NavDropdown>
						) : (
							<LinkContainer to="/login">
								<Nav.Link>
									<i className="fas fa-user"></i>Sign In
								</Nav.Link>
							</LinkContainer>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Header
