import React, {useRef, useEffect, useState} from 'react';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';
import { getSize } from '../../../lib/utility/customFunc';
import { ClearEx, CustomLink } from '../../common/StyleUtilModels';

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

// 상품 일반 정보와 부가설명 사이의 경계선
// const ProductHr = styled.hr`
//     margin: 10px auto;
//     position: relative;
//     width: ${(props) => props.width || "100%"};
//     /* padding: 0 10px; */
// `;
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
                {/* 상품정보 */}
                <ProductNameLink 
                    to = {props.itemLink || '/1'}
                >
                    {props.itemName}
                    <span className="sizeInfo">
                        {props.itemSize}
                    </span>
                </ProductNameLink>                            

            </ProductWrapper>
            {/* 상품 END */}


          
        </StyledItem>
    );
};

export default ProductItem;
