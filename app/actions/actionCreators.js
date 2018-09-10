import {actionTypes} from './actionTypes'
import {MID_AUTH_URL, REDIRECT_URI_REGEX} from '../config/apiConstants'
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
        .catch(error => fetchPostsFailure(subreddit, error))
}

function extractPosts(subreddit, response) {
    if (subreddit === 'hot') {
        const defaultPostMapping = post => ({
            title: post.data.title,
            thumb: 'no_thumb'
        })
        return Promise.all(response.data.children.map(child => {
            const noThumb = ['default', 'self', 'nsfw', 'image'].includes(child.data.thumbnail)
            if (noThumb) {
                return new Promise(function (resolve) {
                    resolve(defaultPostMapping(child))
                })
            }
            return fetchToDataUrl(child.data.thumbnail).then(thumbDataUrl => ({
                ...defaultPostMapping(child),
                thumb: thumbDataUrl
            })).catch(() => defaultPostMapping(child))
        })).catch(e => console.error(e))
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

export const fetchPostsFailure = (subreddit, message) => ({
    type: actionTypes.FETCH_POSTS_FAILURE,
    payload: `An error has occurred while fetching posts from /r/${subreddit}${message ? `: \"${message}\"` : '. Try again later.'}`
})
