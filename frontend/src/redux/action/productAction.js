import axios from 'axios'

import {
	PRODUCTS_LIST_FAIL,
	PRODUCTS_LIST_SUCCESS,
	PRODUCTS_LIST_REQUEST,
	PRODUCTS_DETAIL_FAIL,
	PRODUCTS_DETAIL_SUCCESS,
	PRODUCTS_DETAIL_REQUEST
} from '../../constants/productConstants'

export const listProducts = () => async (dispatch) => {
	try {
		dispatch({ type: PRODUCTS_LIST_REQUEST })
		const { data } = await axios.get('/api/products')
		dispatch({ type: PRODUCTS_LIST_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: PRODUCTS_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		})
	}
}

export const listProductDetail = (id) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCTS_DETAIL_REQUEST })
		const { data } = await axios.get(`/api/products/${id}`)
		dispatch({ type: PRODUCTS_DETAIL_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: PRODUCTS_DETAIL_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		})
	}
}
