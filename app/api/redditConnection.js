import {REDDIT_API_URL} from '../config/apiConstants'

export default (endpoint, token) => {
    return fetch(REDDIT_API_URL + endpoint, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => response.json())
}
