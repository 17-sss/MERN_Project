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

const [
    GET_ALL_CATEGORY,
    GET_ALL_CATEGORY_SUCCESS,
    GET_ALL_CATEGORY_FAILURE,
] = createRequestActionTypes('category/GET_ALL_CATEGORY');
// =======================================================================


// 액션 생성 함수 작성
export const createCategory = createAction(
    CREATE_CATEGORY,
    ({ key, displayValue, items }) => {
        return {
            key,
            displayValue,
            items,
        };
    },
);

export const getAllCategory = createAction(GET_ALL_CATEGORY);
// =======================================================================

// 사가 생성
const createCategorySaga = createRequestSaga(
    CREATE_CATEGORY,
    categoryAPI.createCategory,
);

const getAllCategorySaga = createRequestSaga(
    GET_ALL_CATEGORY,
    categoryAPI.getAllCategory,
)

export function* categorySaga() {
    yield takeLatest(CREATE_CATEGORY, createCategorySaga);
    yield takeLatest(GET_ALL_CATEGORY, getAllCategorySaga);
}
// =======================================================================


// 리듀서 초기값
const initialState = {
    category: {
        key: '',
        displayValue: '',
        items: [],
    },
    categoryError: null,
};
// =======================================================================


// 리듀서
const category = handleActions(
    {
        // createCategory
        [CREATE_CATEGORY_SUCCESS]: (state, action) => {            
            const { payload: category } = action;   // @@200930 참고, 데이터(payload)는 어디서 들어오는지 메모해둠. 
            
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
        
        // getAllCategory
        [GET_ALL_CATEGORY_SUCCESS]: (state, action) => {
            const {payload: category} = action;
  
            return {
                ...state,
                category,
                categoryError: null,
            }
        },
        [GET_ALL_CATEGORY_FAILURE]: (state, action) => {
            const {payload: categoryError } = action;
            console.log(categoryError);
            return {
                ...state,
                category: null,
                categoryError,
            }
        },
    },
    initialState
);

export default category;