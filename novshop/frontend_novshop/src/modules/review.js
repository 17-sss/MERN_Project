import { createRequestActionTypes, createRequestSaga } from '../lib/reduxUtil';
import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as reviewAPI from '../lib/api/review';

// 액션 이름 설정
const [
    CREATE_REVIEW,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_FAILURE,
] = createRequestActionTypes('review/CREATE_REVIEW');

// 액션 생성 함수 작성
export const createReview = createAction(
    CREATE_REVIEW,
    ({ userid, categoryId, productId, subject, content, picture, rate }) => ({
        userid,
        categoryId,
        productId,
        subject,
        content,
        picture,
        rate,
    }),
);

// 사가 생성
const createReviewSaga = createRequestSaga(
    CREATE_REVIEW,
    reviewAPI.createReview,
);

export function* reviewSaga() {
    yield takeLatest(CREATE_REVIEW, createReviewSaga);    
}

// 리듀서 초기값
const initialState = {
    reviewForm: {
        userid: 0,
        categoryId: 0,
        productId: 0,
        subject: '',
        content: '',
        picture: '',
        rate: 0,
    },
    review: null,
    reviewError: null,
    reviewStatus: null,
};


// 리듀서
const review = handleActions(
    {
        [INITALIZE_REVIEW]: (state) => {
            return {
                ...state,
                reviewForm: initialState['reviewForm'],
                review: null,
                reviewError: null,
            };
        },

        [CHANGE_REVIEW]: (state, action) => {
            const { payload } = action;
            const { key, value } = payload;

            return {
                ...state,
                reviewForm: {
                    ...state["reviewForm"],
                    [key]: value,
                },
            };

        },

        [CREATE_REVIEW_SUCCESS]: (state, action) => {
            const { payload: review } = action;

            return {
                ...state,
                review,
                reviewError: null,
            };
        },

        [CREATE_REVIEW_FAILURE]: (state, action) => {
            const { payload: reviewError } = action;

            return {
                ...state,
                review: null,
                reviewError,
            };
        },
    }
);

export default review;