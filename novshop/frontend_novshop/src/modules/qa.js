/* 
    - QA 생성과 onChange는 Write 모듈에서 처리
    - 여기선 QA 불러오는것만 담당.
*/

import { createRequestActionTypes, createRequestSaga } from '../lib/reduxUtil';
import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as qaAPI from '../lib/api/qa';

// :: 액션 이름 설정
const INITALIZE_QA = 'qa/INITALIZE_QA';
const INITALIZE_QA_FORM = 'qa/INITALIZE_QA_FORM';

const [
    GET_PRODUCT_QA,
    GET_PRODUCT_QA_SUCCESS,
    GET_PRODUCT_QA_FAILURE,
] = createRequestActionTypes('qa/GET_PRODUCT_QA');

// :: 액션 생성 함수 작성
export const initializeQA = createAction(INITALIZE_QA);

export const initializeQAForm = createAction(INITALIZE_QA_FORM, ({ form }) => ({
    form,
}));

export const getProductQA = createAction(GET_PRODUCT_QA, ({ productId }) => ({
    productId,
}));

// :: 사가 생성
const getProductQASaga = createRequestSaga(GET_PRODUCT_QA, qaAPI.getProductQA);

export function* qaSaga() {
    yield takeLatest(GET_PRODUCT_QA, getProductQASaga);
}

// :: 리듀서 초기값
const initialState = {
    qaStatus: null,
    qaError: null,
};

// :: 리듀서
const qa = handleActions(
    {
        // QA 전체 초기화
        [INITALIZE_QA]: (state) => {
            return {
                ...state,
                qaStatus: null,
                qaError: null,
            };
        },

        // QA (선택적) 초기화
        [INITALIZE_QA_FORM]: (state, action) => {
            const { payload } = action;
            const { form } = payload;

            return {
                ...state,
                [form]: initialState[form],
            };
        },

        // 특정 상품 QA GET
        [GET_PRODUCT_QA_SUCCESS]: (state, action) => {
            const { payload: qaStatus } = action;

            return {
                ...state,
                qaStatus,
                qaError: null,
            };
        },

        [GET_PRODUCT_QA_FAILURE]: (state, action) => {
            const { payload: qaError } = action;

            return {
                ...state,
                qaStatus: null,
                qaError,
            };
        },
    },
    initialState,
);

export default qa;
