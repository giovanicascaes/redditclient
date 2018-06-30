import React from 'react';
import RootStack, {AppStack} from '../../config/routes';
import AuthLoading from '../../screens/AuthLoading';

export default ({bootstrapped, authToken}) => {
    if (bootstrapped) {
        if (authToken) {
            return <AppStack/>;
        }

        return <RootStack/>;
    }

    return <AuthLoading/>;
};
