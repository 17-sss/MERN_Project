import React from 'react';
import SwipeTemplate from '../swipe/SwipeTemplate';
import ProductContainer from '../../containers/product/ProductContainer';

const MainTemplate = () => {
    return (
        <>
            <SwipeTemplate />
            <ProductContainer 
                // Items = {TestItem()}
            />
        </>
    );
};

export default MainTemplate;
