import React from 'react';
import BuyContainer from '../containers/buy/BuyContainer';
import ShoppingCartContainer from '../containers/buy/ShoppingCartContainer';

const PurchasePage = (props) => {
    const {
        match: { params },
    } = props;
    const { page } = params;

    return page === 'buy' ? (
        <BuyContainer />
    ) : page === 'shoppingcart' ? (
        <ShoppingCartContainer />
    ) : (
        <div>Error</div>
    );
};

export default PurchasePage;
