import { createRequestActionTypes, createRequestSaga } from '../lib/reduxUtil';
import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as categoryAPI from '../lib/api/category';


// 액션 이름 설정
const [
    CREATE_CATEGORY,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAILURE,
] = createRequestActionTypes('category/CREATE_CATEGORY');

// 액션 생성 함수 작성
export const insertCategory = createAction(
    CREATE_CATEGORY,
    ({ key, displayValue, items }) => {
        return {
            key,
            displayValue,
            items,
        };
    },
);

// 사가 생성
const insertCategorySaga = createRequestSaga(
    CREATE_CATEGORY,
    categoryAPI.insertCategory,
);

export function* categorySaga() {
    yield takeLatest(CREATE_CATEGORY, insertCategorySaga);
}

// 리듀서 초기값
const initialState = {
    category: {
        key: '',
        displayValue: '',
        items: [],
    },
    categoryError: null,
};

// 리듀서
const category = handleActions(
    {
        [CREATE_CATEGORY_SUCCESS]: (state, action) => {
            // @@200930 참고, 데이터(payload)는 어디서 들어오는지 메모해둠. 
            const { payload: category } = action;
            
            return {
                ...state,
                category,
                categoryError: null,
            };
        },
        [CREATE_CATEGORY_FAILURE]: (state, action) => {
            const { payload: categoryError } = action;
            
            return {
                ...state,
                category: null,
                categoryError,
            };
        },
    },
    initialState
);

export default category;