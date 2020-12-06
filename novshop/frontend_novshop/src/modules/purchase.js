// ShoppingCart & Buy
import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import { createRequestActionTypes, createRequestSaga } from '../lib/reduxUtil';
import * as purchaseAPI from '../lib/api/purchase';

// 리덕스에 등록 안함, api 만들어야함.
// 액션 이름 정의 ----
const INITALIZE_PURCHASE = 'purchase/INITALIZE_PURCHASE';

const [
    CART_IN,
    CART_IN_SUCCESS,
    CART_IN_FAILURE,
] = createRequestActionTypes('purchase/CART_IN');
// =======================================================================

// 액션 생성 함수 작성
export const cartIn = createAction(
    CART_IN,
    ({ volume, selcolor, selsize, }) => ({ volume, selcolor, selsize, }),
);
// =======================================================================

// 사가 생성
const cartInSaga = createRequestSaga(
    CART_IN,
    purchaseAPI.cartIn,
);

export function* purchaseSaga() {
    yield takeLatest(CART_IN, cartInSaga);
};
// =======================================================================

// 리듀서 초기값
const initialState = {
    buy: null,
    shoppingcart: null,    
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
                shoppingcart: null,
                purchaseError: null,
            };
        },

        // 장바구니 담기
        [CART_IN_SUCCESS]: (state, payload) => {
            const {payload: shoppingcart} = payload;

            return {
                ...state,
                shoppingcart,
                purchaseError: null,

            };
        },        
        [CART_IN_FAILURE]: (state, payload) => {
            const {payload: purchaseError} = payload;

            return {
                ...state,
                shoppingcart: null,
                purchaseError,
            };
        }
    },
    initialState,
);

export default purchase;