import React from 'react'
import {connect} from 'react-redux'

import Login from './Login'
import {authInit, resetAuth} from '../../actions/actionCreators'

const mapStateToPros = ({auth: {authenticating, error}}) => ({
    authenticating,
    error
})

const mapDispatchToProps = dispatch => ({
    initAuth: () => dispatch(authInit()),
    resetAuth: () => dispatch(resetAuth())
})

export default connect(mapStateToPros, mapDispatchToProps)(Login)
