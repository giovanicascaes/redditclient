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
                    data={this.props.posts}
                    keyExtractor={post => post.index.toString()}
                    renderItem={({item}) => {
                        const {thumb, title, subreddit} = item
                        return (
                            <Post image={thumb}
                                  title={title}
                                  subreddit={subreddit}/>
                        )
                    }
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
