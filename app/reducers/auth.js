import {actionTypes} from '../actions/actionTypes'

const authInitialState = {
    token: null,
    timeout: null,
    time: null,
    authenticating: false
}

export default (state = authInitialState, {type, payload = {}}) => {
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
            return {
                ...state,
                token: null, // TODO remover linha
                authenticating: false
            }
        default:
            return state
    }
}

export const url = (state = null, {type, payload}) => {
    switch (type) {
        case actionTypes.SAVE_URL:
            return payload
        case actionTypes.CLEAR_URL:
            return null
        default:
            return state
    }
}

export const error = (state = null, {type, payload}) => {
    switch (type) {
        case actionTypes.AUTH_FAILURE:
            return payload
        case actionTypes.DISMISS_ERROR_MESSAGE:
            return null
        default:
            return state
    }
}
