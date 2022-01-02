import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loading = () => {
	return (
		<Spinner
			animation="border"
			role="status"
			style={{
				height: '50px',
				width: '50px',
				margin: 'auto',
				display: 'block'
			}}
		></Spinner>
	)
}

export default Loading
