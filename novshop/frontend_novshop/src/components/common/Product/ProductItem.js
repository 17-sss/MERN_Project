import React, {useRef, useEffect, useState} from 'react';
import styled, {css} from 'styled-components';
import { Col } from 'react-bootstrap';
import { getSize } from '../../../lib/utility/customFunc';
import { ClearEx, CustomLink } from '../StyleUtilModels';
import { cssDisplayNone, cssStrike } from '../StyleUtilCSS';

// [최상위] 상품정보 전부를 표시할 틀
const StyledItem = styled(Col)`
    height: ${getSize(1.6, 'height')};
    /* border: 1px solid black; */
    padding: 15px;    
`;

// =============================================[1]
// [1] Image Wrapper
const ImageWrapper = styled.div`
    text-align: center;
    margin: 5px 0;
`;
// =============================================[1]

// =============================================[2]
// [2] Product Wrapper
const ProductWrapper = styled.div`
    width: 100%;
`;

// 색상 Wrapper
const ProductColorWrapper = styled.div`
    width: 100%;
    margin: 10px 0;
`;

// 색상
const ProductColor = styled.span`
    width: 20px;
    height: 4px;
    margin-right: 2px;
    float: left;
    box-sizing: border-box;
    border: 1px solid #e3e3e5;    
    font-size: 0;
    line-height: 0;

    background-color: ${(props) => props.color === undefined ? "black" : props.color};
`;

// 상품명 & 상품 사이즈 정보
const ProductNameLink = styled(CustomLink)`
    margin: 0;
    padding: 0;
    
    font-weight: bold;
    font-size: 13px;
    color: black;

    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        color: black;
    }

    .sizeInfo {
        padding-left: 4px;
        font-size: 11px;
        color: #666666;
        font-weight: normal;
    }    
`;

// 상품 가격 & 할인가격 Wrappe mode = {1}r
const ProductPriceUl = styled.ul`
    ${props => {
        switch (props.mode) {
            case 1: {
                return css`                    
                    padding-bottom: 24px;                    
                    display: block;
                    height: 18px;
                    line-height: 18px;
                    font-size: 12px; 
                    border-bottom: 1px solid #e6e6e6;

                    li.custom_price {
                        ${props => props.customPrice || 
                            css`
                                ${cssDisplayNone};
                                ${cssStrike};    
                            `
                        }
                        /* 따로 styled로 만들어서 sale, price, custom 구분해야? */
                    }

                    li.price {
                        display: inline-block;                        
                        color: black;
                    }
                `
            }
            case 2: {
                return css`
                    line-height: 1.5em;

                    li.subname {
                        font-size: 11px;
                        color: #666666;
                    }
                `
            }                
        
            default: 
                break;
        }
    }}
`;

// =============================================[2]


// -------------------------------------------------------------------


const ProductItem = (props) => {    
    const [colHeight, setColHeight] = useState(0);
    const colRef = useRef(null);

    const [imgHeight, setImgHeight] = useState(0);
    const imgRef = useRef(null);
    const imgOnload = () => {        
        return setImgHeight(imgRef.current.clientHeight);
    };

    useEffect(() => {
        setColHeight(colRef.current.clientHeight); 
    }, [colHeight, imgHeight]);


    const imageTagHeight = () => {
        if ((colHeight === 0) || (imgHeight === 0)) {
            return;
        }

        if ((colHeight * 0.7) <  imgHeight) 
            return "auto"            
        else 
            return (colHeight * 0.7);        
    }    

    return (
        <StyledItem ref = {colRef}>
            {/* 이미지 START */}
            <ImageWrapper>
                <img                    
                    ref = {imgRef}
                    onLoad = {imgOnload}                    
                    src= {props.itemImage}
                    alt= {props.itemName}
                    width="100%"                    
                    height={imageTagHeight()}                    
                />                
            </ImageWrapper>
            {/* 이미지 END */}
            
            <ClearEx />

            {/* 상품 START */}
            <ProductWrapper>
                {/* 색상 */}
                <ProductColorWrapper>
                    <ProductColor color = "red" />
                    <ProductColor color = "blue" />
                    <ProductColor />    {/* 색상 정보는 배열로 받아올것 */}                    
                </ProductColorWrapper>
                
                <ClearEx style = {{padding: "2px 0"}}/>    
                
                {/* 상품명 & 사이즈 정보 */}
                <ProductNameLink 
                    to = {props.itemLink || '/1'}
                >
                    {props.itemName}
                    <span className="sizeInfo">
                        {props.itemSize}
                    </span>
                </ProductNameLink> 
                
                {/* 상품가격 */}
                <ProductPriceUl mode = {1}>
                    <li className = "custom_price">custom</li>
                    <li className = "price">{"32,000"}원</li>
                </ProductPriceUl>
                <ProductPriceUl mode = {2}>
                    <li className = "subname">
                        {"구김없고 가벼워 매일찾아질거에요!"}
                    </li> 
                </ProductPriceUl>
                

            </ProductWrapper>
            {/* 상품 END */}


          
        </StyledItem>
    );
};

export default ProductItem;
