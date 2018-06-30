import React from "react";
import {StyleSheet, WebView} from "react-native";

import {LOGIN_URL} from '../../config/constants'

export default class {
    static navigationOptions = {
        headerTitle: 'Authorize this application'
    };

    render() {
        return <WebView source={{uri: LOGIN_URL}} onNavigationStateChange={this.props.onNavigationStateChange} style={styles.container}/>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
