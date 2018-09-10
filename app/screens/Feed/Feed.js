import React from 'react'
import {FlatList, StyleSheet, View} from 'react-native'

import Post from '../../components/Post';
import {withProps} from '../../lib/reactHelpers'

@withProps({
    subreddit: 'hot'
})
class Feed extends React.Component {
    componentDidMount() {
        const {navigation, subreddit, fetchPosts} = this.props
        navigation.setParams({
            tabBarLabel: subreddit.charAt(0).toUpperCase() + subreddit.substr(1)
        })
        fetchPosts(subreddit)
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={[{imgSrc: null}]}
                    renderItem={post => (
                        <Post image={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                              title={'Título qualquer'}
                              subreddit={'Subreddit qualquer'}/>
                    )
                    }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

Feed.navigationOptions = ({navigation}) => ({
    tabBarLabel: navigation.getParam('tabBarLabel')
})

export default Feed
