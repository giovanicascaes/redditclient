import {connect} from 'react-redux';

import Auth from './Auth';
import {login} from '../../actions/actionCreators';
import {REDIRECT_URI_REGEX} from '../../config/constants';

const mapDispatachToProps = (dispatch, ownProps) => ({
    onNavigationStateChange: navigationState => {
        const token = navigationState.url.match(REDIRECT_URI_REGEX);

        if (token != null) {
            dispatch(login(token));
            ownProps.navigation.navigate('App');
        }
    }
});

export default connect(null, mapDispatachToProps)(Auth);
