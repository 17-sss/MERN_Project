import React from 'react';
import SwipeTemplate from './SwipeTemplate';
import ProductItem from '../common/Product/ProductItem';
import ProductList from '../common/Product/ProductList';
import styled from 'styled-components';

const StyledPaddingTop20 = styled.div`
    padding-top: 20px;
`;

const MainTemplate = () => {
    // const TestItem = () => {
    //     let arr = [];
    //     for (let i = 0; i < 19; i++) {
    //         arr.push('테스트' + i);
    //     }
    //     return arr;
    // };

    return (
        <>
            <SwipeTemplate />
            <StyledPaddingTop20 />

            <ProductList MgLR5>
                <ProductItem
                    style={{ backgroundColor: 'red' }}
                    TestSize
                    className="col-lg"
                >
                    테스트1
                </ProductItem>
                <ProductItem
                    style={{ backgroundColor: 'red' }}
                    TestSize
                    className="col-lg"
                >
                    테스트2
                </ProductItem>
                <ProductItem
                    style={{ backgroundColor: 'red' }}
                    TestSize
                    className="col-lg"
                >
                    테스트3
                </ProductItem>
                <ProductItem
                    style={{ backgroundColor: 'red' }}
                    TestSize
                    className="col-lg"
                >
                    테스트4
                </ProductItem>
            </ProductList>
        </>
    );
};

export default MainTemplate;
