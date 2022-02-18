import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
	productsListReducer,
	productsDetailReducer
} from './reducer/productsListreducer'
import { cartReducer } from './reducer/cartReducer'
import {
	userDetailsReducer,
	userReducer,
	userRegisterReducer,
	userUpdateReducer
} from './reducer/userReducer'

const reducer = combineReducers({
	productsList: productsListReducer,
	productDetail: productsDetailReducer,
	cart: cartReducer,
	userLogin: userReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateReducer
})

const cartAddItemLocalStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: []

const userInfoLocalStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: {}

const initialState = {
	cart: {
		cartItems: cartAddItemLocalStorage,
		shippingAddress: shippingAddressFromStorage
	},
	user: { userInfo: userInfoLocalStorage }
}
const middleware = [thunk]
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
