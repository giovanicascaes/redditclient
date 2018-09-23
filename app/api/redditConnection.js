import {REDDIT_API_URL, REDDIT_POST_FETCH_DEFAULT_LIMIT, REDDIT_POST_FETCH_LIMIT_PARAM} from '../config/apiConstants'

export const after = postName => createParam('after', postName)
export const limit = limit => createParam(REDDIT_POST_FETCH_LIMIT_PARAM, limit)

const createParam = (name, value) => ({
    name,
    value
})

export const fetchPostsJson = (endpoint, token, ...params) => {
    const defaultParams = [limit(REDDIT_POST_FETCH_DEFAULT_LIMIT)]
    const url = REDDIT_API_URL + endpoint + '?'
        + defaultParams.filter(defParam => params.every(({name}) => name !== defParam.name))
            .concat(params).reduce((acc, {name, value}) =>
                acc + '&' + encodeURIComponent(name) + '=' + encodeURIComponent(value), '')
    return fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => response.json())
}
