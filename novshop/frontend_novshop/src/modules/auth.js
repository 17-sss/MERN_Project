//---------------------------------- 리덕스 어렵누...
import { createAction } from 'redux-actions';
import { createRequestActionTypes  } from "../lib/reduxUtil";

// 액션 생성
const INITALIZE_FORM = 'auth/INITALIZE_FORM';   
export const initializeForm = createAction(INITALIZE_FORM, form => form);   // login & register

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN');
export const login = createAction(LOGIN, ({userid, userpwd}) => {
    return {
        userid,
        userpwd,
    };
});

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes('auth/R EGISTER');
export const register = createAction(REGISTER, ({userid, userpwd}) => {
    return {
        userid,
        userpwd,
    };
});

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
export const changeField = createAction(CHANGE_FIELD, ({form, key, value}) => {
    return {
        form,   // register, login
        key,    // userid, userpwd, userpwdConfirm
        value,  // 실제 바꾸려는 값
    };
});


// 사가 생성은 나중에..


