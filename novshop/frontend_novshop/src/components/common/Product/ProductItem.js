import React, {useRef, useEffect, useState} from 'react';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';
import { getSize } from '../../../lib/utility/customFunc';

const StyledItem = styled(Col)`
    height: ${getSize(1.6, 'height')};
    border: 1px solid black;
    padding: 15px;    
`;

const ImageWrapper = styled.div`
    text-align: center;
    margin: 10px 0;
`;

const ProductName = styled.span`
    font-weight: bold;
    font-size: 13px;
    color: black;

    span {
        padding-left: 4px;
        font-size: 11px;
        color: #666666;
        font-weight: normal;
    }    
`;

const ProductHr = styled.hr`
    margin: 10px auto;
    position: relative;
    width: ${(props) => props.width || "100%"};
    /* padding: 0 10px; */
`;

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
            <ProductName>
                {props.itemName}
                <span>
                    {props.itemSize}
                </span>
            </ProductName>            
            <ProductHr />            
        </StyledItem>
    );
};

export default ProductItem;
