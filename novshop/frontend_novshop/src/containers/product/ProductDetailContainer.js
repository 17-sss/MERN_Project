import React, { useState, useEffect, useRef } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { addSelectProduct, changeProductForms, getProduct } from "../../modules/product";

import ProductDetailTemplate from "../../components/product/ProductDetailTemplate";

const ProductDetailContainer = (props) => {
    const {query} = props;
    const {main: categoryId, sub: categorySub, itemId: id} = query;    
    const dispatch = useDispatch();
    const {productStatus, productSelectItems } = useSelector(({product}) => {
        return {
            productStatus: product.productStatus,
            productSelectItems: product.productSelectItems,
        }
    });
    
    const [imgClientSize, setImgClientSize] = useState({width: 0, height: 0});
    const imgRef = useRef();    

    useEffect( () => {
        setImgClientSize({
            width: imgRef.current.clientWidth,
            height: imgRef.current.clientHeight,
        });
    }, []);

    useEffect(()=> {    
        dispatch(getProduct({categoryId, categorySub, id}));        
    }, [dispatch, categoryId, categorySub, id]);
    
    let productData = {};
    if (productStatus && productStatus.data) {
        const {image, sizes, colors} = productStatus.data;
        
        productData = {
            ...productStatus.data,
            image: image && "/uploads/" + image,
            sizes: sizes && JSON.parse(sizes),
            colors: colors && JSON.parse(colors),
        }
    };

    // 색상, 사이즈 둘 다 정했을 시 현재 선택 목록에 IN
    const onOptionConfirmation = (e) => {
        if (!productStatus) return;
        const {name, sizes, price, sale} = productStatus.data;
        let sizeinfo = sizes && JSON.parse(sizes).join(', ');
        let mileage = 
            (sale > 0) ? 
                Math.floor((price - price / sale) * 0.01)
                : Math.floor(price * 0.01);        
        e.preventDefault();
        dispatch(addSelectProduct({
            name,
            sizeinfo,
            size: '',
            color: '',
            volume: 1,
            price,
            mileage,
        }));
    };

    // 현재 선택 목록의 수량 onChange
    const onVolumeChange = (e) => {
        e.preventDefault();
        if (!e.target) return;
        const {value, name: inputName, id} = e.target;
        dispatch(changeProductForms({
            form: "productSelectItems",
            key: "items",
            value,
            opt: {
                inputName,
                id,                
            },
        }));
    };

    const events = {onOptionConfirmation, onVolumeChange};    
    const imgDivInfo = {imgRef, imgClientSize};

    // render
    return (
        <ProductDetailTemplate 
            productData = {productData} 
            productSelectItems = {productSelectItems}            
            events = {events}
            imgDivInfo = {imgDivInfo} 
        />
    )
};


export default ProductDetailContainer;