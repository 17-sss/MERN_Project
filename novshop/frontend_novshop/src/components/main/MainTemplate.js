import React from 'react';
import SwipeTemplate from '../swipe/SwipeTemplate';
import ProductTemplate from '../product/ProductTemplate';

const MainTemplate = () => {
    return (
        <>
            <SwipeTemplate />
            <ProductTemplate 
                // Items = {TestItem()}
            />
        </>
    );
};

export default MainTemplate;
