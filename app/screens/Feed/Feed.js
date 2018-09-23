import React from 'react'
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Post from '../../components/Post'
import Loading from '../Loading'
import {getIconVariant} from '../../lib/uiHelpers'
import {colors} from '../../config/styleDefinition'

export default class extends React.Component {
    navigationOptions = ({navigation}) => ({
        tabBarLabel: navigation.getParam('tabBarLabel')
    })

    constructor(props) {
        super(props)
        this.state = {
            refreshing: false
        }
    }

    componentDidMount() {
        const {navigation, subreddit, fetchPosts} = this.props
        navigation.setParams({
            tabBarLabel: subreddit.charAt(0).toUpperCase() + subreddit.substr(1)
        })
        fetchPosts(subreddit)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.fetching
            && !this.props.fetching
            && this.state.refreshing) {
            this.setState({
                refreshing: false
            })
        }
    }

    onRefresh = () => {
        const {refreshPosts, subreddit} = this.props
        this.setState({
            refreshing: true
        }, () => refreshPosts(subreddit))
    }

    onEndReached = () => {
        const {fetching, fetchMorePosts, subreddit} = this.props
        if (!fetching) {
            fetchMorePosts(subreddit)
        }
    }

    renderFooter = () => {
        return (<ActivityIndicator style={styles.footer}/>)
    }

    render() {
        const {fetching, error, posts} = this.props
        if (posts.length === 0 && fetching && !this.state.refreshing) {
            return (
                <Loading/>
            )
        }
        if (error) {
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
                    data={posts}
                    keyExtractor={post => post.index.toString()}
                    renderItem={({item}) => {
                        const {thumb, title, subreddit} = item
                        return (
                            <Post image={thumb}
                                  title={title}
                                  subreddit={subreddit}/>
                        )
                    }}
                    onRefresh={this.onRefresh}
                    refreshing={this.state.refreshing}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={this.renderFooter}
                />
            </View>
        )
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
    },
    footer: {
        marginVertical: 20
    }
})
