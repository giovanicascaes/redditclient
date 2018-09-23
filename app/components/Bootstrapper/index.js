import React from 'react'
import {connect} from 'react-redux'

import {checkAuth} from '../../actions/actionCreators';
import Bootstrapper from './Bootstrapper'

const mapStateToPros = ({auth: {token, tokenValidated}}) => ({
    token,
    tokenValidated
})

const mapDispatchToProps = dispatch => ({
    checkAuth: () => dispatch(checkAuth())
})

export default connect(mapStateToPros, mapDispatchToProps)(Bootstrapper)
