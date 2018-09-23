import {actionTypes} from './actionTypes'
import {
    MID_AUTH_URL,
    NO_THUMB,
    REDDIT_POST_FETCH_DEFAULT_LIMIT,
    REDDIT_POST_FETCH_LIMIT_PARAM,
    REDIRECT_URI_REGEX
} from '../config/apiConstants'
import {after, fetchPostsJson, limit} from '../api/redditConnection'
import {fetchToDataUrl} from '../lib/fetchHelpers'

export const checkAuth = () => (dispatch, getState) => {
    const {timeout, time} = getState().auth
    if (time && timeout) {
        if (Date.now() - time > timeout * 1000) {
            dispatch(resetAuth())
        } else {
            dispatch(validateToken())
        }
    }
}

export const validateToken = () => ({
    type: actionTypes.VALIDATE_TOKEN
})

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

export const authFailure = message => ({
    type: actionTypes.AUTH_FAILURE,
    payload: `An error has occurred while authenticating on Reddit${message ? `: \"${message}\"` : '. Try again later.'}`
})

export const resetAuth = () => ({
    type: actionTypes.RESET_AUTH
})

export const saveUrl = url => ({
    type: actionTypes.SAVE_URL,
    payload: url
})

export const dismissAuthErrorMessage = () => ({
    type: actionTypes.CLEAR_AUTH_ERROR
})

export const fetchPosts = (
    subreddit,
    onSuccessActionCreator = posts => fetchPostsSuccess(subreddit, posts),
    ...options
) => (dispatch, getState) => {
    dispatch(fetchPostsInit())
    fetchPostsJson(subreddit, getState().auth.token, ...options)
        .then(response => {
            if (response.error) {
                dispatch(fetchPostsFailure(subreddit, `Error ${response.error}: ${response.message}`))
            } else {
                extractPosts(response, subreddit).then(posts => dispatch(onSuccessActionCreator(posts)))
            }
        }).catch(error => dispatch(fetchPostsFailure(subreddit, error)))
}

export const refreshPosts = subreddit => dispatch => {
    dispatch(fetchPosts(
        subreddit,
        posts => dispatch => {
            dispatch(clearPosts(subreddit))
            dispatch(fetchPostsSuccess(subreddit, posts))
        }))
}

export const fetchMorePosts = (subreddit, qtOfPostsRendered) => (dispatch, getState) => {
    const posts = getState().posts.subreddits[subreddit]
    const numOfCachedPostsRemaining = posts.length - qtOfPostsRendered
    if (numOfCachedPostsRemaining >= REDDIT_POST_FETCH_DEFAULT_LIMIT) {
        return
    }
    const options = [after(posts[posts.length - 1].name)]
    const numOfPostsToFetch = REDDIT_POST_FETCH_DEFAULT_LIMIT - numOfCachedPostsRemaining
    if (numOfPostsToFetch >= 0) {
        options.push(limit(numOfPostsToFetch))
    }
    dispatch(fetchPosts(subreddit, posts => dispatch => {
        dispatch(fetchPostsSuccess(subreddit, posts, true))
    }, ...options))
}

function extractPosts(response, subreddit) {
    if (subreddit === 'hot') {
        return Promise.all(response.data.children.map(child => {
            const {title, subreddit, name, thumbnail} = child.data
            const post = {
                title,
                subreddit,
                thumb: NO_THUMB,
                name
            }
            const noThumb = ['default', 'self', 'nsfw', 'image'].includes(thumbnail)
            if (noThumb) {
                return new Promise(function (resolve) {
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

export const clearPosts = subreddit => ({
    type: actionTypes.CLEAR_POSTS,
    payload: subreddit
})

export const fetchPostsInit = () => ({
    type: actionTypes.FETCH_POSTS_INIT
})

export const fetchPostsSuccess = (subreddit, posts, more = false) => ({
    type: actionTypes.FETCH_POSTS_SUCCESS,
    payload: {
        subreddit,
        posts,
        more
    }
})

export const fetchPostsFailure = (subreddit, message) => ({
    type: actionTypes.FETCH_POSTS_FAILURE,
    payload: `An error has occurred while fetching posts from /r/${subreddit}${message ? `: \"${message}\"` : '. Try again later.'}`
})

export const dismissPostsErrorMessage = () => ({
    type: actionTypes.CLEAR_POSTS_ERROR
})
