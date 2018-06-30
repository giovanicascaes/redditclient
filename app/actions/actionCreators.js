import {actionTypes} from "./actionTypes";

export const login = token => ({
    type: actionTypes.LOGIN,
    payload: token
});
