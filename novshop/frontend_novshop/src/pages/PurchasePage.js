import React from 'react';
import BuyContainer from '../containers/purchase/BuyContainer';
import CartContainer from '../containers/purchase/CartContainer';

const PurchasePage = (props) => {
    const {
        match: {
            params: { page },
        },        
    } = props;
    return page === 'buy' ? <BuyContainer /> : page === 'shoppingcart' && <CartContainer/>
};

export default PurchasePage;
