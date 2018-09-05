import React from 'react'
import {connect} from 'react-redux'

import Login from './Login'
import {authInit, authReset} from '../../actions/actionCreators'

const mapStateToPros = ({auth, error}) => ({
    authenticating: auth.authenticating,
    error
})

const mapDispatchToProps = dispatch => ({
    initAuth: () => dispatch(authInit()),
    resetAuth: () => dispatch(authReset())
})

export default connect(mapStateToPros, mapDispatchToProps)(Login)
