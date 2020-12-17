// ** API나 기타 값들을 저장하는 리덕스 모듈 **
import { createAction, handleActions } from 'redux-actions';

// 액션 이름 설정
const INITALIZE_UTIL_FORM = 'util/INITALIZE_UTIL_FORM';
const SET_ADDRESS_RESULT = 'util/SET_ADDRESS_RESULT';

// 액션 생성 함수 생성
export const initializeUtilForm = createAction(INITALIZE_UTIL_FORM, ({form}) => ({form}));
export const setAddressResult = createAction(
    SET_ADDRESS_RESULT,
    ({ zonecode, address, buildingName, bname }) => ({
        zonecode,
        address,
        buildingName,
        bname,
    }),
);

// 리듀서 초기값
const initialState = {
    // addressResult, Daum 우편번호 검색 API, 결과값 전용
    addressResult: {
        zonecode: null, // 우편번호
        address: null, // 기본주소
        buildingName: null, // 건물명
        bname: null, // 법정동/법정리 이름
    },
};

// 리듀서 생성
const util = handleActions(
    {     
        [INITALIZE_UTIL_FORM]: (state, action) => {
            const { payload: {form} } = action;            
            return {
                ...state,                
                [form]: initialState[form],                
            };
        },        
        [SET_ADDRESS_RESULT]: (state, action) => {
            const { payload } = action;
            const { zonecode, address, buildingName, bname } = payload;
            return {
                ...state,
                addressResult: {
                    zonecode,
                    address,
                    buildingName,
                    bname,
                },
            };
        },
    },
    initialState,
);

export default util;
