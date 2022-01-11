import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
	productsListReducer,
	productsDetailReducer
} from './reducer/productsListreducer'
import { cartReducer } from './reducer/cartReducer'

const reducer = combineReducers({
	productsList: productsListReducer,
	productDetail: productsDetailReducer,
	cart: cartReducer
})

const cartAddItemlLocalStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: []

const initialState = {
	cart: { cartItems: cartAddItemlLocalStorage }
}
const middleware = [thunk]
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
