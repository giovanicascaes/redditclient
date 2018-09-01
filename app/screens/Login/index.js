import React from 'react'
import {connect} from 'react-redux'

import Login from './Login'
import {initAuth} from '../../actions/actionCreators'

const mapStateToPros = ({auth, error}) => ({
    authenticating: auth.authenticating,
    error
})

const mapDispatchToProps = dispatch => ({
    initAuth: () => dispatch(initAuth())
})

export default connect(mapStateToPros, mapDispatchToProps)(Login)
