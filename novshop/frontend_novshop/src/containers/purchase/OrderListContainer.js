import React from "react";
import { useSelector } from "react-redux";
import OrderListTemplate from "../../components/purchase/OrderListTemplate";

const OrderListContainer = () => {
    const { userData } = useSelector(({user, buy}) => {
        return {
            userData: user.user,

        }
    });

    console.log(userData);

    const headDatas = [
        {name: '주문일자', width: "12%"},
        {name: '이미지', width: "16%"},
        {name: '상품정보', width: "41%"},
        {name: '수량', width: "12%"},
        {name: '상품구매금액', width: "13%"},
    ];

    return (
        <OrderListTemplate etc={{headDatas,}}/>
    )
};

export default OrderListContainer;