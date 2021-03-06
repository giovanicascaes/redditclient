import {actionTypes} from '../actions/actionTypes';

export default (state = null, {type, error}) => {
    if (error) {
        return error
    } else if (type === actionTypes.CLEAR_AUTH_ERROR) {
        return null
    }
    return state
}
