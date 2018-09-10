import React from 'react'
import {connect} from 'react-redux'

import Feed from './Feed'
import {fetchPosts} from '../../actions/actionCreators'

const mapStateToProps = ({posts}) => ({
    fetching: posts.fetching
})

const mapDispatchToProps = dispatch => ({
    fetchPosts: subreddit => dispatch(fetchPosts(subreddit))
})

export default connect(mapStateToProps, mapDispatchToProps)(Feed)
