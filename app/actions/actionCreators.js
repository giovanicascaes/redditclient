import {actionTypes} from './actionTypes'
import {MID_AUTH_URL, NO_THUMB, REDIRECT_URI_REGEX} from '../config/apiConstants'
import fetchJson from '../api/redditConnection'
import {fetchToDataUrl} from '../lib/fetchHelpers'

export const checkAuth = (prevBootstrappedProp, bootstrapped) => (dispatch, getState) => {
    if (bootstrapped && prevBootstrappedProp !== bootstrapped) {
        const {timeout, time} = getState().auth
        if (time && Date.now() - time > timeout * 1000) {
            dispatch(resetAuth())
        }
    }
}

export const authInit = () => ({
    type: actionTypes.AUTH_INIT
})

export const tryAuth = (url, previousUrl) => (dispatch) => {
    if (url === previousUrl) {
        return
    }
    let newUrl = url
    if (previousUrl && previousUrl === MID_AUTH_URL) {
        const match = url.match(REDIRECT_URI_REGEX)
        if (match) {
            const [, newToken, timeout] = match
            dispatch(authSuccess(newToken, timeout))
        } else {
            dispatch(authFailure())
        }
        newUrl = null
    }
    dispatch(saveUrl(newUrl))
}

export const authSuccess = (token, timeout) => ({
    type: actionTypes.AUTH_SUCCESS,
    payload: {
        token,
        timeout
    }
})

export const authFailure = message => dispatch => {
    setTimeout(() => dispatch(dismissAuthErrorMessage()), 10000)
    dispatch({
        type: actionTypes.AUTH_FAILURE,
        payload: `An error has occurred while authenticating on Reddit${message ? `: \"${message}\"` : '. Try again later.'}`
    })
}

export const resetAuth = () => ({
    type: actionTypes.RESET_AUTH
})

export const saveUrl = url => ({
    type: actionTypes.SAVE_URL,
    payload: url
})

export const dismissAuthErrorMessage = () => ({
    type: actionTypes.RESET_AUTH_ERROR
})

export const fetchPosts = subreddit => (dispatch, getState) => {
    dispatch(fetchPostsInit())
    fetchJson(subreddit, getState().auth.token)
        .then(response => {
            if (response.error) {
                dispatch(fetchPostsFailure(subreddit, `Error ${response.error}: ${response.message}`))
            } else {
                extractPosts(subreddit, response).then(posts => dispatch(fetchPostsSuccess(subreddit, posts)))
            }
        })
        .catch(error => dispatch(fetchPostsFailure(subreddit, error)))
}

function extractPosts(subreddit, response) {
    if (subreddit === 'hot') {
        return Promise.all(response.data.children.map(child => {
            const {title, subreddit, thumbnail} = child.data
            const post = {
                title,
                subreddit,
                thumb: NO_THUMB
            }
            const noThumb = ['default', 'self', 'nsfw', 'image'].includes(thumbnail)
            if (noThumb) {
                return new Promise(function(resolve) {
                    resolve(post)
                })
            }
            return fetchToDataUrl(thumbnail).then(thumbDataUrl => ({
                ...post,
                thumb: thumbDataUrl
            })).catch(() => post)
        }))
    }
    return []
}

export const fetchPostsInit = () => ({
    type: actionTypes.FETCH_POSTS_INIT
})

export const fetchPostsSuccess = (subreddit, posts) => ({
    type: actionTypes.FETCH_POSTS_SUCCESS,
    payload: {
        subreddit,
        posts
    }
})

export const fetchPostsFailure = (subreddit, message) => dispatch => {
    setTimeout(() => dispatch(dismissPostsErrorMessage()), 10000)
    dispatch({
        type: actionTypes.FETCH_POSTS_FAILURE,
        payload: `An error has occurred while fetching posts from /r/${subreddit}${message ? `: \"${message}\"` : '. Try again later.'}`
    })
}

export const dismissPostsErrorMessage = () => ({
    type: actionTypes.RESET_POSTS_ERROR
})
