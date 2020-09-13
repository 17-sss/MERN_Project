import React from 'react';
import SwipeTemplate from '../swipe/SwipeTemplate';
import ProductTemplate from '../product/ProductTemplate';


const MainTemplate = () => {
    /*
    const TestItem = () => {
        let arr = [];
        for (let i = 0; i < 19; i++) {
            arr.push('테스트' + i);
        }
        return arr;
    };
    */

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
