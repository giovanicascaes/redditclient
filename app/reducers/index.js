import {combineReducers} from 'redux'

import auth, {url, error} from './auth'

export default combineReducers({auth, url, error})
