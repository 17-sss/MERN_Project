import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import { createRequestActionTypes, createRequestSaga } from '../lib/reduxUtil';
import * as productAPI from '../lib/api/product';


// 액션 이름 정의
const [
    CREATE_PRODUCT,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAILURE,
] = createRequestActionTypes('product/CREATE_PRODUCT');
// =======================================================================


// 액션 생성 함수 작성
export const createProduct = createAction(
    CREATE_PRODUCT, 
    // ({name, image, sizes, colors, price, sale, description, categorySub, categoryId})
    productData => productData
);
// =======================================================================


// 사가 생성
const createProductSaga = createRequestSaga(
    CREATE_PRODUCT,
    productAPI.createProduct,
);

export function* productSaga() {
    yield takeLatest(CREATE_PRODUCT, createProductSaga);
}
// =======================================================================


// 리듀서 초기값 
const initialState = {
    productForm: {  
        name: "", 
        image: "", 
        sizes: [], 
        colors: [],  
        price: 1000, 
        sale: 0, 
        description: "", 
        categorySub: 0, 
        categoryId: 0,
    },
    product: null,
    productError: null,
};
// =======================================================================


// 리듀서
const product = handleActions(
    {
        [CREATE_PRODUCT_SUCCESS]: (state, action) => {
            const {payload: product} = action;            

            return {
                ...state,
                product,
                productError: null,
            }
        },
        [CREATE_PRODUCT_FAILURE]: (state, action) => {
            const {payload: productError} = action;

            return {
                ...state,  
                product: null,          
                productError,
            }
        }
    },
    initialState
);

export default product;