import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getProduct } from "../../modules/product";

import ProductDetailTemplate from "../../components/product/ProductDetailTemplate";

const ProductDetailContainer = (props) => {
    const {query} = props;
    const {main: categoryId, sub: categorySub, itemId: id} = query;    
    const {productStatus} = useSelector(({product}) => {
        return {
            productStatus: product.productStatus,
        }
    });
    const dispatch = useDispatch();

    useEffect(()=> {    
        dispatch(getProduct({categoryId, categorySub, id}));        
    }, [dispatch, categoryId, categorySub, id]);
    
    let productData = {};
    if (productStatus && productStatus.data) {
        const {image, sizes, colors} = productStatus.data;

        productData = {
            ...productStatus.data,
            image: "/uploads/" + image,
            sizes: sizes && JSON.parse(sizes),
            colors: colors && JSON.parse(colors),
        }
    }
    // render
    return <ProductDetailTemplate productData = {productData} />
};


export default ProductDetailContainer;