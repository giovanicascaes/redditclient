import React from 'react'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'

import Bootstrapper from './components/Bootstrapper'
import getStoreConfiguration from './config/storeConfiguration'

const {store, persistor} = getStoreConfiguration()

export default () =>
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            {bootstrapped => <Bootstrapper bootstrapped={bootstrapped}/>}
        </PersistGate>
    </Provider>
