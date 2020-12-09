// ShoppingCart & Buy
import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import { createRequestActionTypes, createRequestSaga } from '../lib/reduxUtil';
import * as purchaseAPI from '../lib/api/purchase';

// 리덕스에 등록 안함, api 만들어야함.
// 액션 이름 정의 ----
const INITALIZE_PURCHASE = 'purchase/INITALIZE_PURCHASE';
const CHANGE_PURCHASE = 'purchase/CHANGE_PURCHASE'; 

const [CART_IN, CART_IN_SUCCESS, CART_IN_FAILURE] = createRequestActionTypes(
    'purchase/CART_IN',
);
const [GET_CART, GET_CART_SUCCESS, GET_CART_FAILURE] = createRequestActionTypes(
    'purchase/GET_CART',
);
const [
    UPD_CART_VOLUME,
    UPD_CART_VOLUME_SUCCESS,
    UPD_CART_VOLUME_FAILURE,
] = createRequestActionTypes('purchase/UPD_CART_VOLUME');


// =======================================================================

// 액션 생성 함수 작성
export const initialPurchase = createAction(INITALIZE_PURCHASE);
export const changePurchase = createAction(CHANGE_PURCHASE, ({form, key, value}) => ({form, key, value}));
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
export const updCartVolume = createAction(
    UPD_CART_VOLUME,
    ({ id, volume }) => ({ id, volume }),
);
// =======================================================================

// 사가 생성
const cartInSaga = createRequestSaga(CART_IN, purchaseAPI.cartIn);
const getCartSaga = createRequestSaga(GET_CART, purchaseAPI.getCart);
const updCartVolumeSaga = createRequestSaga(UPD_CART_VOLUME, purchaseAPI.updCartVolume);

export function* purchaseSaga() {
    yield takeLatest(CART_IN, cartInSaga);
    yield takeLatest(GET_CART, getCartSaga);
    yield takeLatest(UPD_CART_VOLUME, updCartVolumeSaga);
}
// =======================================================================

// 리듀서 초기값
const initialState = {
/* 
    - 지금까지 내가 리덕스 모듈을 만들때 ~form + ~status 느낌)
        1) buyFormStatus: 구매 상태를 담당 
        2) cartFormStatus: 장바구니 상태를 담당
*/
    buy: null,
    buyFormStatus: {
        items: null,
        // 추후 수정 (필요한 값 등록하기 cartFormStatus 처럼)
    },
    cart: null,
    cartFormStatus: {
        items: null,

        allProductPrice: "",     // 상품구매금액
        shippingFee: "",         // 배송비
        totalPrice: "",          // 상품구매금액 + 배송비
    },
    
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
                buyFormStatus: initialState["buyFormStatus"],
                cart: null,
                cartFormStatus: initialState["cartFormStatus"],                
                purchaseError: null,
            };
        },

        // onChange (일반적인 onChange)
        [CHANGE_PURCHASE]: (state, action) => {
            const { payload } = action;
            const { form, key, value } = payload;            

            return {
                ...state,
                [form]: {
                    ...state[form],
                    [key]: value,
                }
            }
        },

        // 장바구니 담기
        [CART_IN_SUCCESS]: (state, action) => {
            const { payload: cart } = action;

            return {
                ...state,
                cart,
                purchaseError: null,
            };
        },
        [CART_IN_FAILURE]: (state, action) => {
            const { payload: purchaseError } = action;

            return {
                ...state,
                cart: null,
                purchaseError,
            };
        },

        // 장바구니 정보 가져오기
        [GET_CART_SUCCESS]: (state, action) => {
            const { payload: {data: items} } = action;

            return {
                ...state,
                cartFormStatus: {
                    ...state["cartFormStatus"],
                    items,
                },
                purchaseError: null,
            };
        },
        [GET_CART_FAILURE]: (state, action) => {
            const { payload: purchaseError } = action;

            return {
                ...state,
                cartFormStatus: initialState["cartFormStatus"],
                purchaseError,
            };
        },

        // 수량 업데이트 (불러온 데이터 기반)   -- 작업중
        [UPD_CART_VOLUME_SUCCESS]: (state, action) => {
            const { payload: cart } = action;
            console.log(action);
            return {
                ...state,
                cart,
                purchaseError: null,
            };
        },
        [UPD_CART_VOLUME_FAILURE]: (state, action) => {
            const { payload: purchaseError } = action;

            return {
                ...state,
                cart: null,
                purchaseError,
            };
        },
        
    },
    initialState,
);

export default purchase;
