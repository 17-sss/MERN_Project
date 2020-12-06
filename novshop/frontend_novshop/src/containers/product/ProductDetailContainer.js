import React, { useState, useEffect, useRef, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { addSelectProduct, delSelectProduct, changeProductForms, getProduct, initializeProductForm } from "../../modules/product";
import { createReview, getProductReview, initializeReview } from '../../modules/review';
import { getProductQA, initializeQA } from '../../modules/qa';

import ProductDetailTemplate from "../../components/product/ProductDetailTemplate";


const ProductDetailContainer = (props) => {
    const {query, history } = props;
    const {main: categoryId, sub: categorySub, itemId: id} = query;    
    const dispatch = useDispatch();
    const {productStatus, productSelectItems, reviewStatus, qaStatus } = useSelector(({product, review, qa}) => {
        return {
            productStatus: product.productStatus,
            productSelectItems: product.productSelectItems,
            reviewStatus: review.reviewStatus,
            qaStatus: qa.qaStatus,
        }
    });

    const colorRef = useRef();
    const sizeRef = useRef();
        
    const [imgClientSize, setImgClientSize] = useState({width: 0, height: 0});
    const [errorMessage, setErrorMessage] = useState('');
    const imgRef = useRef();    

    useEffect( () => {        
        setImgClientSize({
            width: imgRef.current.clientWidth,
            height: imgRef.current.clientHeight,
        });
        
    }, []);

    useEffect(() => {
        dispatch(initializeProductForm({form: "productSelectItems"}));
        dispatch(initializeReview());
        dispatch(initializeQA());
        
        window.scrollTo(0,0);   // 맨위로    
    }, [dispatch]);
    
    useEffect(()=> {        
        dispatch(getProductReview({productId: id}));        
        dispatch(getProductQA({productId: id}));          
    }, [dispatch, id]);

    useEffect(()=> {    
        dispatch(getProduct({categoryId, categorySub, id}));        
    }, [dispatch, categoryId, categorySub, id]);

    useEffect(() => {
        errorMessage && setTimeout(() => {
            setErrorMessage('');
        }, 3000);
    }, [errorMessage])
    
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
        // const {name: selName, selectedIndex} = e.target;     // ref 사용하기로        
        if (!productStatus || !productSelectItems) return;        
        if (!colorRef.current || !sizeRef.current) return;
        if (colorRef.current.selectedIndex <= 0 || sizeRef.current.selectedIndex <= 0) return;        

        const {name, sizes, price, sale, mileage} = productStatus.data;
        const {items} = productSelectItems;
        const color = colorRef.current.value;
        const size = sizeRef.current.value;        

        e.preventDefault();
        
        if (items.filter((aObj) => (aObj.color === color) && (aObj.size === size)).length !== 0) {
            colorRef.current.selectedIndex = 0;
            sizeRef.current.selectedIndex = 0;
            return alert('이미 선택되어 있는 옵션입니다.');            
        }

        let id = -1;
        if (items.length > 0) {
            let arrTmp = [];
            items.map((v) => arrTmp.push(v.id));   
            id = arrTmp.reduce((acc, cur) => (acc > cur) ? acc : cur);              
            id++;                      
        } else {
            id = 1;    
        }   

        let sizeinfo = sizes && JSON.parse(sizes).join(', ');                
        
        dispatch(addSelectProduct({
            id,
            name,
            sizeinfo,
            size,
            color,
            volume: 1,
            price: (sale > 0 && sale < 1) ? Math.round((price - (price * sale))) : price,
            mileage,
        }));

        return (colorRef.current.selectedIndex = 0, sizeRef.current.selectedIndex = 0);
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

    // 현재 선택 목록 중 제거버튼 누른 항목 제거
    const onOptionDelete = (e) => {
        const {id} = e.target;        
        if (id <= -1) return;
        e.preventDefault();

        dispatch(delSelectProduct({id}));
    }

    // 구매 / 장바구니 버튼 OnClick
    const onPurchaseClick = useCallback((e) => {        
        if (!productSelectItems) return;
        if (productSelectItems && productSelectItems.items && productSelectItems.items.length <= 0) {
            return setErrorMessage("필수 옵션을 선택해주세요!");
        }
        const {value} = e.target;                    

        if (value === "CART") {
            //  Redux에서 값 업뎃 & 유저의 장바구니 테이블에 데이터 IN
            if (window.confirm('장바구니에 상품이 정상적으로 담겼습니다. 장바구니로 이동하시겠습니까?')) {                
                history.push(`/purchase/shoppingcart`);
            } else return;
        } else {
            history.push(`/purchase/buy`)            
        }
    }, [history, productSelectItems]);

    // 리뷰, Q&A 추가용 테스트      ---------------- 추후 구매내역을 기반으로 리뷰를 작성하는 폼 만들기.
    const onAddReviewTest = (e) => {
        e.preventDefault();        
        dispatch(createReview({userId: 1, productId: 1, subject: '테스트사진', content: '내용', picture: '있음', rate: 3}));        
    }
    // -----

    const refs = {colorRef, sizeRef};
    const events = {onOptionConfirmation, onVolumeChange, onOptionDelete, onPurchaseClick, onAddReviewTest};    
    const imgDivInfo = {imgRef, imgClientSize};

    // render
    return (
        <ProductDetailTemplate 
            productData = {productData}     // productStatus 기반
            productSelectItems = {productSelectItems}            
            reviewStatus = {reviewStatus}
            qaStatus = {qaStatus}            

            refs = {refs}
            events = {events}
            etcs = {{imgDivInfo, errorMessage}}             
        />
    )
};


export default withRouter(ProductDetailContainer);