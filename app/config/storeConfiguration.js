import {applyMiddleware, createStore} from 'redux'
import {createMigrate, persistReducer, persistStore} from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import rootReducer from '../reducers'

const migrations = {
    3: state => ({
        auth: {
            token: null,
            timeout: null,
            time: null,
            authenticating: false,
            url: null,
            error: null
        },
        posts: {
            subreddits: [],
            fetching: false,
            error: null
        }
    })
}

const persistConfig = {
    key: 'root',
    version: 3,
    migrate: createMigrate(migrations),
    storage,
    stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))
    const persistor = persistStore(store)
    return {store, persistor}
}
