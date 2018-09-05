import {combineReducers} from 'redux'
import {actionTypes} from '../actions/actionTypes';

import auth from './auth'
import posts from './posts'

const url = (state = null, {type, payload}) => {
    switch (type) {
        case actionTypes.SAVE_URL:
            return payload
        case actionTypes.AUTH_INIT:
            return null
        default:
            return state
    }
}

const error = (state = null, {type, payload}) => {
    switch (type) {
        case actionTypes.AUTH_FAILURE:
            return payload
        case actionTypes.DISMISS_ERROR_MESSAGE:
            return null
        default:
            return state
    }
}

export default combineReducers({auth, url, error})
