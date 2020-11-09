import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import category, { categorySaga } from './category';
import product, { productSaga } from './product';
import review, { reviewSaga } from './review';
import qa, { qaSaga } from './qa';
import loading from './loading';

const rootReducer = combineReducers({
    auth,
    category,
    user,
    product,
    review,
    qa,
    loading,
});

export function* rootSaga() {
    yield all([authSaga(), userSaga(), categorySaga(), productSaga(), reviewSaga(), qaSaga()]);
}

export default rootReducer;
