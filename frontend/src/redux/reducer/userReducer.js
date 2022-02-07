import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUECCSS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUECCSS,
	USER_REGISTER_FAIL
} from '../../constants/userConstants'

export const userReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true }
		case USER_LOGIN_SUECCSS:
			return { loading: false, userInfo: action.payload }
		case USER_LOGIN_FAIL:
			return { loading: false, error: action.payload }
		case USER_LOGOUT:
			return { payload: action.payload }

		default:
			return state
	}
}

export const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { loading: true }
		case USER_REGISTER_SUECCSS:
			return { loading: false, userInfo: action.payload }
		case USER_REGISTER_FAIL:
			return { loading: false, error: action.payload }

		default:
			return state
	}
}
