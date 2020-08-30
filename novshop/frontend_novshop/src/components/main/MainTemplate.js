import React from 'react';
import SwipeTemplate from './SwipeTemplate';
import ProductItem from '../common/Product/ProductItem';
import ProductList from '../common/Product/ProductList';


const MainTemplate = () => {
    return (
        <>
            <SwipeTemplate/>
            <div style = {{paddingTop: '1%'}}/>
            <ProductList style = {{marginTop: '20%'}}>
                <ProductItem style = {{backgroundColor: 'red', }} TestSize>
                    테스트1
                </ProductItem>
                <ProductItem style = {{backgroundColor: 'blue',}}  TestSize >
                    테스트2
                </ProductItem>
                <ProductItem style = {{backgroundColor: 'yellow', }} TestSize>
                    테스트3
                </ProductItem>
                <ProductItem style = {{backgroundColor: 'green', }} TestSize>
                    테스트4
                </ProductItem>
            </ProductList>
            
            <div style = {{paddingTop: '1%'}}/>
            
            <ProductList>
                <ProductItem style = {{backgroundColor: 'red', }} >
                    테스트5
                </ProductItem>
                <ProductItem style = {{backgroundColor: 'blue', }} >
                    테스트6
                </ProductItem>
                <ProductItem style = {{backgroundColor: 'yellow', }} >
                    테스트7
                </ProductItem>
                <ProductItem style = {{backgroundColor: 'green', }} >
                    테스트8
                </ProductItem>
            </ProductList>
            {/*
            <BoxModel 
                padding="15% 0"                
            />
            <BoxModel 
                padding="15% 0"
                backgroundColor='skyblue'
            />
            */}
        </>
    );
};

export default MainTemplate;