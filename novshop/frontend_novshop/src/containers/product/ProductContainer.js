import React from 'react';
import ProductForm from "../../components/product/ProductTemplate/ProductForm";
import ProductItem from "../../components/product/ProductTemplate/ProductItem";
import productData from "../../lib/data/productList.json";

const ProductContainer = () => {
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


export default ProductContainer;