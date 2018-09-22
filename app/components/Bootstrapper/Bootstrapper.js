import React from 'react'
import RootStack, {AppStack} from '../../config/routes'
import AuthLoading from '../../screens/Loading'

export default class extends React.Component {
    componentDidUpdate() {
        const {bootstrapped, token, tokenValidated, checkAuth} = this.props
        if (bootstrapped && token && !tokenValidated) {
            checkAuth()
        }
    }

    render() {
        const {bootstrapped, tokenValidated} = this.props
        if (bootstrapped) {
            if (tokenValidated) {
                return <AppStack/>
            }
            return <RootStack/>
        }
        return <AuthLoading/>
    }
}
