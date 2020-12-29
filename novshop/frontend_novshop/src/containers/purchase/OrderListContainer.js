import React from "react";
import { withRouter } from "react-router-dom";
import OrderListTemplate from "../../components/purchase/OrderListTemplate";

const OrderListContainer = (props) => {
    return (
        <OrderListTemplate />
    )
};

export default withRouter(OrderListContainer);