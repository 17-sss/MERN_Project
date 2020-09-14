import React from 'react';
import ProductForm from "./frProduct/ProductForm";
import ProductItem from "./frProduct/ProductItem";
import productData from "../../lib/data/productList.json";
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ itemLink값은 임시임

const ProductTemplate = () => {
    // [1] 여기에 데이터 조회하여 배열로 가져옴.
    return (    
        // /shopping/shirt/0?itemId=0
        <ProductForm>
            {productData.map( (v, i) => {
                const {itemId, itemName, itemImage, itemSize, itemColors, price, sale, description, classification} = v;
                const {mainclass, subclass} = classification;
                const aLink = "/shopping/" + mainclass +"/"+ subclass+"?itemId="+itemId;

                return (
                    <ProductItem
                        key = {itemId}
                        itemName = {itemName} 
                        itemImage = {itemImage}                                             
                        itemLink = {aLink}
                        itemSize = {itemSize}
                        itemColors = {itemColors}
                        price = {price}
                        sale = {sale}
                        description = {description}
                    />
                );
            })}                        
        </ProductForm>        
    );
};

export default ProductTemplate;

