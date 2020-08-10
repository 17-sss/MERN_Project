// auth 리듀서
import { createAction, handleActions } from 'redux-actions';

const TEST_ACTION = 'auth/TEST_ACTION';
export const testAction = createAction(TEST_ACTION);

const initalState = {};

const auth = handleActions(
    {
        [TEST_ACTION]: (state, action) => state,
    },
    initalState,
);

export default auth;