// 구매 / 장바구니 Container
import React from "react";
import { withRouter } from "react-router-dom";
import PurchaseTemplate from "../../components/purchase/PurchaseTemplate";

const PurchaseContainer = (props) => {
    const { match: {params: {page}} } = props;    
    
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
    
    return (
        <PurchaseTemplate etcs={{page, colInfo}} />
    );
};

export default withRouter(PurchaseContainer);
