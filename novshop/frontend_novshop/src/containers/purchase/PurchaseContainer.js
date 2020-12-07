// 구매 / 장바구니 Container
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCart, initialPurchase } from "../../modules/purchase";

import PurchaseTemplate from "../../components/purchase/PurchaseTemplate";

const PurchaseContainer = (props) => {
    // [1] 기본 세팅
    const { match: {params: {page}} } = props;    

    const dispatch = useDispatch();
    const { cartStatus, buyStatus, userData } = useSelector(({purchase, user }) => {
        return {
            cartStatus: purchase.cartStatus, 
            buyStatus: purchase.buyStatus, 
            userData: user.user,                
        }
    });

    // useState
    const [data, setData] = useState(null);
    const [curUserId, setCurUserId] = useState(-1);
    // setErrorMessage('');    // 추후제거    

    // [2] 데이터 관련
    // 1. Normal ----------------------
    const setColInfo = (page) => {
        const infoTmp = {
            value: ['이미지', '상품정보', '판매가', '수량', '적립금', '배송비', '합계'],                
            width: ['10', '40', '10', '10', '10', '10', '10'],
        };

        if (page === "shoppingcart") {
            // value: ['check', '이미지', '상품정보', '판매가', '수량', '적립금', '배송비', '합계'],    
            infoTmp.value.unshift('check');            

            // width: ['3', '10', '37', '10', '10', '10', '10', '10'],
            infoTmp.width.unshift('3');
            infoTmp.width.splice(2, 1, '37');
        }
        return infoTmp;
    }
    const colInfo = setColInfo(page);

    // 2. useEffect ----------------------
    // 1-1) 초기화: 유저
    useEffect(() => {
        setCurUserId(userData && userData.data ? userData.data.id : -1);
    }, [userData])

    // 1-2) 초기화: 페이지
    useEffect(() => {
        dispatch(initialPurchase());     
        
        if (curUserId !== -1) {
            if (page === "shoppingcart") {                
                dispatch(getCart({userId: curUserId}));
            } else {
                // 구매 dispatch
            }
        } 
    }, [dispatch, page, curUserId]);

    // 2) 불러온 데이터 세팅 
    useEffect(() => {        
        if (page === "shoppingcart") {
            if (!cartStatus) return;
            if (cartStatus && cartStatus.data && cartStatus.data.length > 0) {
                return setData(cartStatus.data);
            }
        } else if (page === "buy") {
            if (!buyStatus) return;
            if (buyStatus && buyStatus.data && buyStatus.data.length > 0) {
                return setData(buyStatus.data);
            }
        } else return;

    }, [cartStatus, buyStatus, page])

    // ============================================================
    return (
        <PurchaseTemplate data={data} etcs={{page, colInfo}} />
    );
};

export default withRouter(PurchaseContainer);
