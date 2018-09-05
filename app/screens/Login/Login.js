import React from 'react'
import {Button, StyleSheet, Text, View} from 'react-native'

export default class extends React.Component {
    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        const {authenticating, resetAuth} = this.props
        if (authenticating) {
            resetAuth()
        }
    }

    componentDidUpdate() {
        const {authenticating, navigation} = this.props
        if (authenticating) {
            navigation.navigate('Auth')
        }
    }

    renderErrorMessage() {
        const {error} = this.props
        if (error) {
            return (
                <View style={styles.errorWrapper}>
                    <Text style={styles.errorMessage}>{error}</Text>
                </View>
            )
        }
        return null
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.authButtonWrapper}>
                    <Button onPress={this.props.initAuth}
                            title={'Authorize this app'}/>
                </View>
                {this.renderErrorMessage()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    authButtonWrapper: {
        position: 'absolute'
    },
    errorWrapper: {
        marginTop: 100
    },
    errorMessage: {
        color: 'red',
        fontWeight: 'bold',
        paddingHorizontal: 10
    }
})
