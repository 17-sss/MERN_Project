import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import auth, {authSaga} from './auth';
import user, {userSaga} from './user';
import category, {categorySaga} from './category';
import loading from './loading';


const rootReducer = combineReducers({
    auth,    
    category,
    user,

    loading,
});

export function* rootSaga() {
    yield all ([authSaga(), userSaga(), categorySaga()]);
}

export default rootReducer;