import React from 'react'
import {StyleSheet, WebView} from 'react-native'
import {HeaderBackButton} from 'react-navigation'

import {AUTH_URL} from '../../config/apiConstants'

export default class extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: 'Authorize this app',
        headerLeft: <HeaderBackButton onPress={() => {
            navigation.getParam('resetAuth')()
            navigation.goBack()
        }
        }/>
    })

    componentDidMount() {
        const {navigation, resetAuth} = this.props
        navigation.setParams({
            resetAuth
        })
    }

    componentDidUpdate() {
        const {error, token, navigation} = this.props
        if (error) {
            navigation.popToTop()
        } else if (token) {
            navigation.navigate('App')
        }
    }

    onNavigationStateChange = navigationState => this.props.onNavigationStateChange(
        navigationState.url, this.props.previousUrl)

    render() {
        if (this.props.error) {
            return null
        }
        return (
            <WebView source={{uri: AUTH_URL}}
                     onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                     onError={this.props.onError}
                     style={styles.container}/>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
