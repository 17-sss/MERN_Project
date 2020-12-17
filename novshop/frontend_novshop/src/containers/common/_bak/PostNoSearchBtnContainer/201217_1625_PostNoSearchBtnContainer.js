// 우편번호 검색 기능
// https://www.npmjs.com/package/react-daum-postcode
// http://postcode.map.daum.net/guide#attributes

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setAddressResult, initializeUtilForm } from "../../modules/util";

import PostNoSearchBtn from '../../components/common/PostNoSearchBtn';

const PostNoSearchBtnContainer = (props) => {
    // [1] 기본값 지정 관련  
    const { children } = props;

    const dispatch = useDispatch();
    const { addressResult } = useSelector(({util}) => {
        return {
            addressResult: util.addressResult,
        };        
    });          
    const [isShowModal, setIsShowModal] = useState(false);     
    // --------------|   

    // [2] 이벤트
    // 1) onComplete, DaumPostcode의 onComplete
    const onComplete = (data) => {
        if (typeof data === 'object') {            
            const {zonecode, address, buildingName, bname} = data;   
            let bFlag = true;

            for (const key in data) {
                if (key === 'zonecode' || key === 'address') {
                    if (!data[key]) {
                        bFlag = false;
                        break;
                    }
                }
            }
            if (bFlag)
                dispatch(setAddressResult({zonecode, address, buildingName, bname}));
        }                    
    };

    // 2) onShowModal, 우편번호 검색 모달 보이기 상태
    const onShowModal = () => {
        setIsShowModal(!isShowModal);
    };  
    // --------------|
    
    // [3] useEffect
    // 1) 초기화
    useEffect(() => {                        
        dispatch(initializeUtilForm({form: "addressResult"}));                
    }, [dispatch]);
    // --------------------------------------------------------------------------------------------

    return (
        <PostNoSearchBtn
            events={{
                onComplete,
                onShowModal,
            }}
            states={{ isShowModal }}
        >
            {children}
        </PostNoSearchBtn>
    );
};

export default PostNoSearchBtnContainer;
