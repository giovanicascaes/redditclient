import React from 'react'
import {connect} from 'react-redux'

import Feed from './Feed'
import {fetchPosts} from '../../actions/actionCreators'
import {NO_THUMB} from '../../config/apiConstants'

const mapStateToProps = ({posts}) => ({
    fetching: posts.fetching,
    posts: posts.subreddits.hot.map((post, index) => ({
        index,
        ...post,
        thumb: post.thumb === NO_THUMB ? require('../../resources/img/img-placeholder.png') : {uri: post.thumb}
    }))
})

const mapDispatchToProps = dispatch => ({
    fetchPosts: subreddit => dispatch(fetchPosts(subreddit))
})

export default connect(mapStateToProps, mapDispatchToProps)(Feed)
