import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import Loading from '../components/Loading'
import Message from '../components/Message'

import Product from '../components/Product'
import { listProducts } from '../redux/action/productAction'

const HomeScreen = () => {
	const dispatch = useDispatch()
	const productList = useSelector((state) => state.productsList)
	const { loading, error, products } = productList
	useEffect(() => {
		dispatch(listProducts())
	}, [dispatch])
	return (
		<>
			<h3>Latest Product</h3>
			<ToastContainer />
			{loading ? (
				<Loading />
			) : error ? (
				<Message varient="danger" Children={error}>
					{error}
				</Message>
			) : (
				<Row>
					{products.map((product) => (
						<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
							<Product product={product} />
						</Col>
					))}
				</Row>
			)}
		</>
	)
}

export default HomeScreen
