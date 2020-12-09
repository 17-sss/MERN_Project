// 구매 / 장바구니 Container
import React, { useCallback, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changePurchase, updCartVolume, getCart, initialPurchase } from "../../modules/purchase";
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
    const [priceLoading, setPriceLoading] = useState(false);
    const [curUserId, setCurUserId] = useState(-1);
    
    // 3. events
    const onCartVolumeChange = useCallback((e) => {   
        const { value, id } = e.target;
        // 하.. 이거 어떻게해야 -----------------------------------------!!
        dispatch(updCartVolume({id, volume: value}));
    }, [dispatch]);

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

    // 2. useEffect ----------------------
    // 1-1) 초기화: 유저
    useEffect(() => {
        setCurUserId(userData && userData.data ? userData.data.id : -1);
    }, [userData])

    // 1-2) 초기화: 페이지
    useEffect(() => {
        dispatch(initialPurchase());
        if (page === "shoppingcart")  setPriceLoading(false);
        
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

    // 3) shoppingcart용 가격 계산 후 세팅 (상품구매금액, 배송비, 총금액)        
    useEffect(() => {        
        if (priceLoading) return;
        if (page !== "shoppingcart") return;
        if (cartFormStatus && cartFormStatus.items && cartFormStatus.items.length > 0) {
            const allProductPriceTmp = 
                (cartFormStatus.items.length > 1) ? 
                    cartFormStatus.items.reduce(
                        (prev, curr) => {                           
                            const { product: {price: currPrice, sale: currSale}, volume: currVolume } = curr;                        
                            
                            const currValue = 
                                (currSale > 0 && currSale < 1) 
                                    ? (currPrice - currPrice * currSale) * currVolume
                                    : currPrice * currVolume;

                            let prevValue = 0;
                            if (typeof prev === "object") {

                                const {product: {price: prevPrice, sale: prevSale}, volume: prevVolume} = prev;                        
                                prevValue = 
                                    (prevSale > 0 && prevSale < 1) 
                                        ? (prevPrice - prevPrice * prevSale) * prevVolume
                                        : prevPrice * prevVolume;
                            } else if (typeof prev === "number") {
                                prevValue = prev;
                            };
                            
                            return Math.round(Number(prevValue+currValue));
                        },
                    )
                    :
                    cartFormStatus.items.map((v) => {
                        const { product: {price, sale}, volume } = v;
                        const result = 
                            (sale > 0 && sale < 1) 
                                ? (price - price * sale) * volume
                                : price * volume;

                        return Math.round(Number(result));
                    });
                
            const shippingFeeTmp = (allProductPriceTmp >= 30000) ? "무료" : 2500;
            const totalPriceTmp = 
                shippingFeeTmp === "무료" 
                    ? allProductPriceTmp 
                    : allProductPriceTmp + shippingFeeTmp; 
            
            dispatch(
                changePurchase({
                    form: 'cartFormStatus',
                    key: 'allProductPrice',
                    value: threeDigitsComma(allProductPriceTmp),
                }),
            );
            dispatch(
                changePurchase({
                    form: 'cartFormStatus',
                    key: 'shippingFee',
                    value:
                        shippingFeeTmp === "무료" 
                            ? shippingFeeTmp
                            : threeDigitsComma(shippingFeeTmp),
                }),
            );
            dispatch(
                changePurchase({
                    form: 'cartFormStatus',
                    key: 'totalPrice',
                    value: threeDigitsComma(totalPriceTmp),
                }),
            );
            
            const { allProductPrice, shippingFee, totalPrice } = cartFormStatus;
            if (!allProductPrice || !shippingFee || !totalPrice)  
                setPriceLoading(false)
            else 
                setPriceLoading(true);
        }     
    }, [priceLoading, cartFormStatus, page, dispatch]);


    // ============================================================
    return (
        <PurchaseTemplate data={data} etcs={{page, colInfo}} events={{onCartVolumeChange}} />
    );
};

export default withRouter(PurchaseContainer);
