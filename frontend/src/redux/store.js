import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
	productsListReducer,
	productsDetailReducer
} from './reducer/productsListreducer'
import { cartReducer } from './reducer/cartReducer'
import { userReducer, userRegisterReducer } from './reducer/userReducer'

const reducer = combineReducers({
	productsList: productsListReducer,
	productDetail: productsDetailReducer,
	cart: cartReducer,
	userLogin: userReducer,
	userRegister: userRegisterReducer
})

const cartAddItemLocalStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: []

const userInfoLocalStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null

const initialState = {
	cart: { cartItems: cartAddItemLocalStorage },
	user: { userInfo: userInfoLocalStorage }
}
const middleware = [thunk]
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
