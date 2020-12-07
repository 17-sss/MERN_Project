// ShoppingCart & Buy
import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import { createRequestActionTypes, createRequestSaga } from '../lib/reduxUtil';
import * as purchaseAPI from '../lib/api/purchase';

// 리덕스에 등록 안함, api 만들어야함.
// 액션 이름 정의 ----
const INITALIZE_PURCHASE = 'purchase/INITALIZE_PURCHASE';

const [CART_IN, CART_IN_SUCCESS, CART_IN_FAILURE] = createRequestActionTypes(
    'purchase/CART_IN',
);

const [GET_CART, GET_CART_SUCCESS, GET_CART_FAILURE] = createRequestActionTypes(
    'purchase/GET_CART',
);

// =======================================================================

// 액션 생성 함수 작성
export const initialPurchase = createAction(INITALIZE_PURCHASE);
export const cartIn = createAction(
    CART_IN,
    ({ volume, selcolor, selsize, productId, userId }) => ({
        volume,
        selcolor,
        selsize,
        productId,
        userId,
    }),
);
export const getCart = createAction(GET_CART, ({ userId }) => ({ userId }));
// =======================================================================

// 사가 생성
const cartInSaga = createRequestSaga(CART_IN, purchaseAPI.cartIn);
const getCartSaga = createRequestSaga(GET_CART, purchaseAPI.getCart);

export function* purchaseSaga() {
    yield takeLatest(CART_IN, cartInSaga);
    yield takeLatest(GET_CART, getCartSaga);
}
// =======================================================================

// 리듀서 초기값
const initialState = {
    buy: null,
    buyStatus: null,
    cart: null,
    cartStatus: null,
    
    purchaseError: null,
};
// =======================================================================

// 리듀서
const purchase = handleActions(
    {
        // 초기화
        [INITALIZE_PURCHASE]: (state) => {
            return {
                ...state,
                buy: null,
                buyStatus: null,
                cart: null,
                cartStatus: null,                
                purchaseError: null,
            };
        },

        // 장바구니 담기
        [CART_IN_SUCCESS]: (state, payload) => {
            const { payload: cart } = payload;

            return {
                ...state,
                cart,
                purchaseError: null,
            };
        },
        [CART_IN_FAILURE]: (state, payload) => {
            const { payload: purchaseError } = payload;

            return {
                ...state,
                cart: null,
                purchaseError,
            };
        },

        // 장바구니 정보 가져오기
        [GET_CART_SUCCESS]: (state, payload) => {
            const { payload: cartStatus } = payload;

            return {
                ...state,
                cartStatus,
                purchaseError: null,
            };
        },
        [GET_CART_FAILURE]: (state, payload) => {
            const { payload: purchaseError } = payload;

            return {
                ...state,
                cartStatus: null,
                purchaseError,
            };
        }
        
    },
    initialState,
);

export default purchase;
