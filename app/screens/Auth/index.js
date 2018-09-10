import React from 'react'
import {connect} from 'react-redux'

import Auth from './Auth'
import {authFailure, resetAuth, tryAuth} from '../../actions/actionCreators'

const mapStateToProps = ({auth: {token, url, error}}) => ({
    token,
    previousUrl: url,
    error
})

const mapDispatchToProps = dispatch => ({
    onNavigationStateChange: (url, previousUrl) => dispatch(tryAuth(url, previousUrl)),
    resetAuth: () => dispatch(resetAuth()),
    onError: e => dispatch(authFailure(e.nativeEvent.description))
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
