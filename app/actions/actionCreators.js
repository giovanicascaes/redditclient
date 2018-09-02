import {actionTypes} from './actionTypes'
import {MID_AUTH_URL, REDIRECT_URI_REGEX} from '../config/apiConstants'

export const checkAuth = (prevBootstrappedProp, bootstrapped) => (dispatch, getState) => {
    if (bootstrapped && prevBootstrappedProp !== bootstrapped) {
        const {timeout, time} = getState().auth;
        if (time && Date.now() - time > timeout * 1000) {
            dispatch(authReset())
        }
    }
}

export const initAuth = () => ({
    type: actionTypes.AUTH_INIT
})

export const tryAuth = (url, previousUrl) => (dispatch) => {
    let previousUrlHolder = previousUrl
    if (previousUrlHolder && previousUrlHolder === MID_AUTH_URL) {
        const match = url.match(REDIRECT_URI_REGEX)
        if (match) {
            const [, newToken, timeout] = match
            dispatch(authSuccess(newToken, timeout))
        } else {
            dispatch(authFailure())
        }
        previousUrlHolder = null
    } else {
        previousUrlHolder = url
    }
    dispatch(saveUrl(previousUrlHolder))
}

export const authSuccess = (token, timeout) => ({
    type: actionTypes.AUTH_SUCCESS,
    payload: {
        token,
        timeout
    }
})

export const authFailure = message => dispatch => {
    setTimeout(() => dispatch(dismissErrorMessage()), 10000)
    const finalMessage = `An error has occurred when authenticating on Reddit${message ? `: \"${message}\"` : '. Try again later.'}`
    dispatch({
        type: actionTypes.AUTH_FAILURE,
        payload: finalMessage
    })
}

export const authReset = () => ({
    type: actionTypes.AUTH_RESET
})

export const saveUrl = url => ({
    type: actionTypes.SAVE_URL,
    payload: url
})

export const dismissErrorMessage = () => ({
    type: actionTypes.DISMISS_ERROR_MESSAGE
})
