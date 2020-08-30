import React from 'react';
import SwipeTemplate from './SwipeTemplate';
import ProductItem from '../common/Product/ProductItem';
import ProductForm from '../common/Product/ProductList';



const MainTemplate = () => {
    return (
        <>
            <SwipeTemplate/>
            <ProductForm>
                <ProductItem style = {{backgroundColor: 'red'}} >s{">"}</ProductItem>
                <ProductItem style = {{backgroundColor: 'blue'}} >d</ProductItem>
                <ProductItem style = {{backgroundColor: 'yellow'}} >s</ProductItem>
                <ProductItem style = {{backgroundColor: 'green'}} >aa</ProductItem>
            </ProductForm>
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