import {connect} from 'react-redux';

import Bootstrapper from './Bootstrapper';

const mapStateToPros = state => ({
    authToken: state.authToken
});

export default connect(mapStateToPros)(Bootstrapper);
