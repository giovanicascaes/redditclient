import {actionTypes} from '../actions/actionTypes'

const initialState = {
    fetching: false,
    error: null,
    subreddits: {}
}

export default (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case actionTypes.FETCH_POSTS_INIT:
            return {
                ...state,
                fetching: true,
                error: null
            }
        case actionTypes.FETCH_POSTS_SUCCESS:
            const {subreddit, posts} = payload
            return {
                ...state,
                subreddits: {
                    ...state.subreddits,
                    [subreddit]: [
                        ...state.subreddits[subreddit],
                        ...posts
                    ]
                },
                fetching: false
            }
        case actionTypes.FETCH_POSTS_FAILURE:
            return {
                ...state,
                fetching: false,
                error: payload
            }
        case actionTypes.CLEAR_POSTS_ERROR:
            return {
                ...state,
                error: null
            }
        case actionTypes.CLEAR_POSTS:
            return {
                ...state,
                subreddits: {
                    ...state.subreddits,
                    [payload]: []
                }
            }
        default:
            return state
    }
}
