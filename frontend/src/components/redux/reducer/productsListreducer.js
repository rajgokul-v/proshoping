import {
	PRODUCTS_LIST_FAIL,
	PRODUCTS_LIST_SUCCESS,
	PRODUCTS_LIST_REQUEST,
	PRODUCTS_DETAIL_REQUEST,
	PRODUCTS_DETAIL_SUCCESS,
	PRODUCTS_DETAIL_FAIL
} from '../../../constants/productConstants'
export const productsListReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCTS_LIST_REQUEST:
			return { loading: true, products: [] }
		case PRODUCTS_LIST_SUCCESS:
			return { loading: false, products: action.payload }
		case PRODUCTS_LIST_FAIL:
			return { loading: false, error: action.payload }

		default:
			return state
	}
}

export const productsDetailReducer = (
	state = { products: { reveiwes: [] } },
	action
) => {
	switch (action.type) {
		case PRODUCTS_DETAIL_REQUEST:
			return { loading: true, ...state }
		case PRODUCTS_DETAIL_SUCCESS:
			return { loading: false, product: action.payload }
		case PRODUCTS_DETAIL_FAIL:
			return { loading: false, error: action.payload }

		default:
			return state
	}
}
