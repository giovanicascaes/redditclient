import React from 'react'
import {connect} from 'react-redux'

import Auth from './Auth'
import {authReset, tryAuth} from '../../actions/actionCreators'

const mapStateToProps = ({auth, url}) => ({
    token: auth.token,
    previousUrl: url
})

const mapDispatchToProps = dispatch => ({
    onNavigationStateChange: (url, previousUrl) => dispatch(tryAuth(url, previousUrl)),
    resetAuth: () => dispatch(authReset())
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
