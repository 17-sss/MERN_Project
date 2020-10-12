import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import { createRequestActionTypes, createRequestSaga } from '../lib/reduxUtil';
import * as productAPI from '../lib/api/product';
import { replaceAll } from '../lib/utility/customFunc';

// 액션 이름 정의
const INITALIZE_PRODUCT = 'product/INITALIZE_PRODUCT';
const INITALIZE_PRODUCT_ITEM = 'product/INITALIZE_PRODUCT_ITEM';
const CHANGE_PRODUCT = 'product/CHANGE_PRODUCT';

const [
    CREATE_PRODUCT,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAILURE,
] = createRequestActionTypes('product/CREATE_PRODUCT');
// =======================================================================

// 액션 생성 함수 작성
export const changeProductForm = createAction(
    CHANGE_PRODUCT,
    ({ key, value }) => ({
        key,
        value,
    }),
);
export const initializeProduct = createAction(INITALIZE_PRODUCT);
export const initializeProductItem = createAction(INITALIZE_PRODUCT_ITEM, ({key}) => ({key}) );
export const createProduct = createAction(
    CREATE_PRODUCT,
    // ({name, image, sizes, colors, price, sale, description, categorySub, categoryId})
    (productData) => productData,
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
        name: '',
        image: '',
        size: '',
        sizes: [],
        color: '',
        colors: [],
        price: 1000,
        sale: 0,
        description: '',
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
        [INITALIZE_PRODUCT]: (state) => {
            return {
                ...state,
                productForm: initialState['productForm'],
                product: null,
                productError: null,
            };
        },

        [INITALIZE_PRODUCT_ITEM]: (state, action) => {
            const {payload} = action;
            const {key} = payload;
            
            return {
                ...state,
                productForm: {
                    ...state['productForm'],
                    [key]: initialState['productForm'][key],
                }
            };
        },

        [CHANGE_PRODUCT]: (state, action) => {
            const { payload } = action;
            const { productForm: tmpProduct } = state;

            let { key, value } = payload;
            let arrTmp = [];

            switch (key) {
                case 'price':
                case 'sale':
                case 'categorySub':
                case 'categoryId': {
                    value = Number(value);
                    break;
                }
                case 'insertColors':
                case 'insertSizes': {
                    key = replaceAll(key, 'insert', '').toLowerCase();

                    if (key === 'sizes')    arrTmp = tmpProduct.sizes.concat(value);
                    else                    arrTmp = tmpProduct.colors.concat(value);

                    break;
                }
                default:
                    break;
            }

            return {
                ...state,
                productForm: {
                    ...state['productForm'],
                    [key]: key === 'sizes' || key === 'colors' ? arrTmp : value,
                },
            };
        },

        [CREATE_PRODUCT_SUCCESS]: (state, action) => {
            const { payload: product } = action;

            return {
                ...state,
                product,
                productError: null,
            };
        },
        [CREATE_PRODUCT_FAILURE]: (state, action) => {
            const { payload: productError } = action;

            return {
                ...state,
                product: null,
                productError,
            };
        },
    },
    initialState,
);

export default product;
