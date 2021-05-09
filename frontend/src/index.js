import React from 'react'
import ReactDOM from 'react-dom'
import './components/bootstrap.min.css'
import { Provider } from 'react-redux'
import App from './components/App'
import store from './components/store'

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)
