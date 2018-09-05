import React from 'react'
import RootStack, {AppStack} from '../../config/routes'
import AuthLoading from '../../screens/AuthLoading'

export default class extends React.Component {
    componentDidUpdate(prevProps) {
        const {bootstrapped, checkAuth} = this.props
        checkAuth(prevProps.bootstrapped, bootstrapped)
    }

    render() {
        const {bootstrapped, token} = this.props
        if (bootstrapped) {
            if (token) {
                return <AppStack/>
            }
            return <RootStack/>
        }
        return <AuthLoading/>
    }
}
