import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
	productsListReducer,
	productsDetailReducer
} from './reducer/productsListreducer'

const reducer = combineReducers({
	productsList: productsListReducer,
	productDetail: productsDetailReducer
})

const initialState = {}
const middleware = [thunk]
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
