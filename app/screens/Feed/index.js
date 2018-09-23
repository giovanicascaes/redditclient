import React from 'react'
import {connect} from 'react-redux'

import Feed from './Feed'
import {refreshPosts, fetchMorePosts, fetchPosts} from '../../actions/actionCreators'
import {NO_THUMB, REDDIT_POST_FETCH_DEFAULT_LIMIT} from '../../config/apiConstants'

const mapStateToProps = ({posts}, ownProps) => {
    const {fetching, subreddits, error} = posts
    const subredditPosts = subreddits[ownProps.subreddit] || []
    return {
        fetching,
        posts: subredditPosts.map((post, index) => ({
            index,
            ...post,
            thumb: post.thumb === NO_THUMB ? require('../../resources/img/img-placeholder.png') : {
                uri: post.thumb
            }
        })),
        error
    }
}

const mapDispatchToProps = dispatch => ({
    fetchPosts: subreddit => dispatch(fetchPosts(subreddit)),
    refreshPosts: subreddit => dispatch(refreshPosts(subreddit)),
    fetchMorePosts: (subreddit, qttOfPostsRendered) => dispatch(fetchMorePosts(subreddit, qttOfPostsRendered)),
})

const FeedReduxConnected = connect(mapStateToProps, mapDispatchToProps)(Feed)

export default props => (<FeedReduxConnected {...props} subreddit={'hot'}/>)
