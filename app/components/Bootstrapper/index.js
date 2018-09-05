import React from 'react'
import {connect} from 'react-redux'

import {checkAuth} from '../../actions/actionCreators';
import Bootstrapper from './Bootstrapper'

const mapStateToPros = state => ({
    token: state.auth.token
})

const mapDispatchToProps = dispatch => ({
    checkAuth: (prevBootstrappedProp, bootstrapped) => dispatch(checkAuth(prevBootstrappedProp, bootstrapped)),
})

export default connect(mapStateToPros, mapDispatchToProps)(Bootstrapper)
