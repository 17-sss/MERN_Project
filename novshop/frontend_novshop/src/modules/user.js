// user :: Redux Module (유저 세션체크용)
import { createRequestActionTypes, createRequestSaga } from '../lib/reduxUtil';
import { /* createAction, */ handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';

const [CHECK, CHECK_SUCCESS, CHECK_FAILURE]  = createRequestActionTypes('user/CHECK');

// export const check = createAction(CHECK);
export const check = () => {
    return {
        type: CHECK,
        payload: null,
    };
};
// !! usercheck에 괄호 넣으면 내가 원하는 곳에서 실행되지않고 계속실행댐!!
const checkSaga = createRequestSaga(CHECK, authAPI.usercheck());

export function* userSaga() {        
    yield takeLatest(CHECK, checkSaga);    
}

const initialState = {
    user: null,
    checkError: null,
};

const user = handleActions(
    {
        [CHECK_SUCCESS]: (state, action) => {
            const { payload: user } = action;
            return {
                ...state,
                user,
                checkError: null,
            }
        },
        [CHECK_FAILURE]: (state, action) => {
            const { payload: error } = action;
            return {
                ...state,
                user: null,
                checkError: error,
            }
        }
    }, 
    initialState
);

export default user;