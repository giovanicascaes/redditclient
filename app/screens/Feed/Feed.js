import React from 'react'
import {FlatList, StyleSheet, Text, View} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Post from '../../components/Post'
import {withProps} from '../../lib/reactHelpers'
import {getIconVariant} from '../../lib/uiHelpers'
import {colors} from '../../config/styleDefinition'

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

    renderPostList() {
        const {error} = this.props
        if (this.props.error) {
            return (
                <View style={styles.errorContainer}>
                    <View style={styles.errorImageWrapper}>
                        <Ionicons name={getIconVariant('warning')}
                                  size={124}
                                  color={colors.placeHolder}/>
                    </View>
                    <View style={styles.errorWrapper}>
                        <Text style={styles.errorMessage}>{error}</Text>
                    </View>
                </View>
            )
        }
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

    render() {
        return this.renderPostList()
    }
}

const styles = StyleSheet.create({
    postsContainer: {
        flex: 1
    },
    errorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorWrapper: {
        marginTop: 150
    },
    errorImageWrapper: {
        position: 'absolute'
    },
    errorMessage: {
        color: 'red',
        fontWeight: 'bold',
        paddingHorizontal: 10
    }
})

Feed.navigationOptions = ({navigation}) => ({
    tabBarLabel: navigation.getParam('tabBarLabel')
})

export default Feed
