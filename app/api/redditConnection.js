import {REDDIT_API_URL} from '../config/apiConstants'

export default (endpoint, token, params) => {
    let url = REDDIT_API_URL + endpoint
    if (params) {
        url += params.reduce((acc, param) => {
            let newAcc = acc
            if (newAcc !== '?') {
                newAcc += '&'
            }
            return newAcc + encodeURIComponent(param.name) + '=' + encodeURIComponent(param.value)
        }, '?')
    }
    return fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => response.json())
}
