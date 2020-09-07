import React from 'react';
import ProductForm from "./Product/ProductForm";
import ProductItem from "./Product/ProductItem";

const ProductTemplate = () => {
    const Items = () => {
        let arr = [];

        for (let index = 0; index <= 7; index++) {
            arr.push(
                <ProductItem 
                    key = {index}
                    itemImage = "/images/bymono_test1.webp"
                    // itemImage = "/images/200810.jpg"
                    itemName = "메르첼 오버셔츠"
                    itemSize = "[XL-2XL,3XL-4XL]"
                />                                                    
            );                            
        }

        return arr;
    }

    

    return (    
        <ProductForm>
            {Items().map( (value, i) => {
                return value
            })}
        </ProductForm>        
    );
};

export default ProductTemplate;

