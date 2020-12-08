// 구매 / 장바구니 Container
import React, { useCallback, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changePurchase, getCart, initialPurchase } from "../../modules/purchase";
import { threeDigitsComma } from "../../lib/utility/customFunc";

import PurchaseTemplate from "../../components/purchase/PurchaseTemplate";

const PurchaseContainer = (props) => {
    // [1] 기본 세팅 및 이벤트
    // 1. redux 관련
    const { match: {params: {page}} } = props;    

    const dispatch = useDispatch();
    const { cartFormStatus, buyFormStatus, userData } = useSelector(({purchase, user }) => {
        return {
            cartFormStatus: purchase.cartFormStatus, 
            buyFormStatus: purchase.buyFormStatus, 
            userData: user.user,                
        }
    });

    // 2. useState
    const [data, setData] = useState(null);
    const [curUserId, setCurUserId] = useState(-1);
    
    // 3. events
    const onChange = useCallback((e) => {   
        console.log(e);     // 수량 업뎃할때나 쓰일듯. 추후 작업
    }, []);


    // [2] 데이터 관련
    // 1. Normal & etc ----------------------
    // 1) 테이블 행 정보 세팅
    const setColInfo = (page) => {
        const infoTmp = {
            value: ['이미지', '상품정보', '판매가', '수량', '적립금', '합계'],                
            width: ['10', '50', '10', '10', '10', '10', '10'],
        };

        if (page === "shoppingcart") {
            // value: ['check', '이미지', '상품정보', '판매가', '수량', '적립금', '합계'],    
            infoTmp.value.unshift('check');            

            // width: ['3', '10', '47', '10', '10', '10', '10', '10'],
            infoTmp.width.unshift('3');
            infoTmp.width.splice(2, 1, '47');
        }
        return infoTmp;
    }
    const colInfo = setColInfo(page);


    // 2) shoppingcart용 가격 계산 (상품구매금액, 배송비, 총금액) (func)        ***************** 문제있음 (리듀스 무한루프 && 중간 undefined)
    const setCartPrice = (aData) => {   
        if (page !== "shoppingcart") return;
        
        if (aData && aData.items && aData.items.length > 0) {
            const allProductPrice = 
                (aData.items.reduce(
                    (prev, curr) => {   
                        console.log(prev, curr);

                        const {price: currPrice, sale: currSale} = curr.product;                        
                        const currValue = 
                            (currSale > 0 && currSale < 1) 
                                ? (currPrice - currPrice * currSale) 
                                : currPrice;

                        // if (!prev.product)
                        //     return Math.round(Number(currValue));

                        const {price: prevPrice, sale: prevSale} = prev.product;                        
                        const prevValue = 
                            (prevSale > 0 && prevSale < 1) 
                                ? (prevPrice - prevPrice * prevSale) 
                                : prevPrice;

                        return Math.round(Number(prevValue+currValue));
                    },
                ));

            const shippingFee = (allProductPrice >= 30000) ? 0 : 2500;
            const totalPrice = allProductPrice+shippingFee;            
            
            dispatch(
                changePurchase({
                    form: 'cartFormStatus',
                    key: 'allProductPrice',
                    value: threeDigitsComma(allProductPrice),
                }),
            );
            dispatch(
                changePurchase({
                    form: 'cartFormStatus',
                    key: 'shippingFee',
                    value:
                        shippingFee === 0
                            ? '무료'
                            : threeDigitsComma(shippingFee),
                }),
            );
            dispatch(
                changePurchase({
                    form: 'cartFormStatus',
                    key: 'totalPrice',
                    value: threeDigitsComma(totalPrice),
                }),
            );
        }                
    };




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
            if (!cartFormStatus) return;
            if (cartFormStatus && cartFormStatus.items && cartFormStatus.items.length > 0) {
                return setData(cartFormStatus);
            }
        } else if (page === "buy") {
            if (!buyFormStatus) return;
            if (buyFormStatus && buyFormStatus.items && buyFormStatus.items.length > 0) {
                return setData(buyFormStatus);
            }
        } else return;

    }, [cartFormStatus, buyFormStatus, page]);

    
    // ============================================================
    return (
        <PurchaseTemplate data={data} etcs={{page, colInfo}} events={{onChange}} />
    );
};

export default withRouter(PurchaseContainer);
