// 구매 / 장바구니 Container
import React from "react";
import { withRouter } from "react-router-dom";
import PurchaseTemplate from "../../components/purchase/PurchaseTemplate";

const PurchaseContainer = (props) => {
    const { match: {params: {page}} } = props;    

    return (
        <PurchaseTemplate etcs={{page, }} />
    );
};

export default withRouter(PurchaseContainer);