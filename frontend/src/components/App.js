import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

import Header from './Header'
import Footer from './Footer'
import HomeScreen from '../screen/HomeScreen'
import ProductScreen from '../screen/ProductScreen'
import CartScreen from '../screen/CartScreen'
import LoginScreen from '../screen/LoginScreen'
import RegisterScreen from '../screen/RegisterScreen'
import ProfileScreen from '../screen/ProfileScreen'
import ShippingScreen from '../screen/ShippingScreen'
import PaymentScreen from '../screen/PaymentScreen'
import PlaceOrderScreen from '../screen/PlaceOrderScreen'

function App() {
	return (
		<>
			<Router>
				<Header />
				<Container>
					<main className="py-3 " style={{ minHeight: '100vh' }}>
						<Route path="/register" component={RegisterScreen} />
						<Route path="/profile" component={ProfileScreen} />
						<Route path="/shipping" component={ShippingScreen} />
						<Route path="/payment" component={PaymentScreen} />
						<Route path="/placeorder" component={PlaceOrderScreen} />
						<Route path="/login" component={LoginScreen} />
						<Route path="/product/:id" component={ProductScreen} />
						<Route path="/cart/:id?" component={CartScreen} />
						<Route path="/" component={HomeScreen} exact />
					</main>
				</Container>
				<Footer />
			</Router>
		</>
	)
}

export default App
