import {actionTypes} from '../actions/actionTypes'

const initialState = {
    token: null,
    timeout: null,
    time: null,
    tokenValidated: false,
    authenticating: false,
    url: null,
    error: null
}

export default (state = initialState, action) => {
    const {type, payload = {}} = action
    switch (type) {
        case actionTypes.VALIDATE_TOKEN:
            return {
                ...state,
                tokenValidated: true
            }
        case actionTypes.AUTH_INIT:
            return {
                ...state,
                authenticating: true,
                url: null,
                error: null
            }
        case actionTypes.SAVE_URL:
            return {
                ...state,
                url: payload
            }
        case actionTypes.AUTH_SUCCESS:
            const {token, timeout} = payload
            return {
                ...state,
                token,
                timeout,
                time: Date.now(),
                authenticating: false,
                tokenValidated: true
            }
        case actionTypes.AUTH_FAILURE:
            return {
                ...initialState,
                error: payload
            }
        case actionTypes.CLEAR_AUTH_ERROR:
            return {
                ...state,
                error: null
            }
        case actionTypes.RESET_AUTH:
            return initialState
        default:
            return state
    }
}
