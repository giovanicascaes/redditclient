import {applyMiddleware, combineReducers, createStore} from 'redux'
import {createMigrate, persistReducer, persistStore} from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import auth from '../reducers/auth'
import posts from '../reducers/posts'

const migrations = {
    15: state => ({
        auth: {
            token: null,
            timeout: null,
            time: null,
            authenticating: false,
            tokenValidated: false,
            url: null,
            error: null
        },
        posts: {
            subreddits: {
                hot: []
            },
            fetching: false,
            error: null
        }
    })
}

const authPersistConfig = {
    key: 'auth',
    storage,
    blacklist: ['tokenValidated', 'authenticating']
}

const rootPersistConfig = {
    key: 'root',
    version: 15,
    migrate: createMigrate(migrations),
    storage,
    stateReconciler: autoMergeLevel2,
    blacklist: ['auth']
}

const authPersistedReducer = persistReducer(authPersistConfig, auth)

const rootReducer = combineReducers({
    auth: authPersistedReducer,
    posts
})

const rootPersistedReducer = persistReducer(rootPersistConfig, rootReducer)

export default () => {
    const store = createStore(rootPersistedReducer, composeWithDevTools(applyMiddleware(thunk)))
    const persistor = persistStore(store)
    return {store, persistor}
}
