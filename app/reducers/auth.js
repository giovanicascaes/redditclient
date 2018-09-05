import {actionTypes} from '../actions/actionTypes'

const initialState = {
    token: null,
    timeout: null,
    time: null,
    authenticating: false
}

export default (state = initialState, {type, payload = {}}) => {
    switch (type) {
        case actionTypes.AUTH_INIT:
            return {
                ...state,
                authenticating: true
            }
        case actionTypes.AUTH_SUCCESS:
            const {token, timeout} = payload
            return {
                token,
                timeout,
                time: Date.now(),
                authenticating: false
            }
        case actionTypes.AUTH_FAILURE:
        case actionTypes.AUTH_RESET:
            return initialState
        default:
            return state
    }
}
