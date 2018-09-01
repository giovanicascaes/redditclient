import React from 'react'
import {connect} from 'react-redux'

import Auth from './Auth'
import {authFailure, authReset, tryAuth} from '../../actions/actionCreators'

const mapStateToProps = ({auth, url, error}) => ({
    token: auth.token,
    previousUrl: url,
    error
})

const mapDispatchToProps = dispatch => ({
    onNavigationStateChange: (url, previousUrl) => dispatch(tryAuth(url, previousUrl)),
    resetAuth: () => dispatch(authReset()),
    onError: e => dispatch(authFailure(e.nativeEvent.description))
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
