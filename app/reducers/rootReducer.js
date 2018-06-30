import {actionTypes} from '../actions/actionTypes';

const initialState = {
    authToken: ''
};

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.LOGIN:
            return {
                authToken: payload
            };
        default:
            return state;
    }
};
