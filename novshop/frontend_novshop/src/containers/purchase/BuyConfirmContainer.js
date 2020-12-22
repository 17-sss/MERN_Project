import React from "react";
import { withRouter } from "react-router-dom";
import BuyConfirmTemplate from '../../components/purchase/BuyConfirmTemplate';

const BuyConfirmContainer = () => {
    return (
        <BuyConfirmTemplate />
    );
};

export default withRouter(BuyConfirmContainer);