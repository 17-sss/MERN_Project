import React from 'react';
import styled from 'styled-components';
import {MarginBlock, CustomLink} from '../common/StyleUtilModels';

const HeaderBlock = styled.div`
    position: fixed;    
    background-color: ${(props) => props.backgroundColor || "white"};  
    width: ${(props) => props.width === undefined ? "100%" : props.width};  
    box-shadow: ${(props) => props.boxShadow || "rgba(0, 0, 0, 0.08) 0px 2px 4px"}; 
`;

const HeaderCategory = styled.div` 
    padding: ${props => props.padding === undefined ? "0.2rem 0" : props.padding};
    float: right;
`;

const StyledH1 = styled.h1` 
    font-family: "Bauhaus 93";
    font-size: ${props => props.fontSize === undefined ? "20pt" : props.fontSize}; 
`;

const StyledHr = styled.hr`
    margin: 0;
    border-top: 0.7px solid rgb(255, 253, 255);
`;

const EmptyBlock = styled.div`
    height: 6.6rem;
    background-color: rgb(255, 253, 255);
`;

const Header = () => {
    return (
        <>
            <HeaderBlock>    
                <MarginBlock>
                    <StyledH1>nov Shop</StyledH1>
                </MarginBlock>

                <StyledHr />

                <MarginBlock>
                    <HeaderCategory>
                        <CustomLink>카테고리1</CustomLink>
                        <CustomLink>카테고리2</CustomLink>
                        <CustomLink>카테고리3</CustomLink>
                    </HeaderCategory>
                </MarginBlock>

            </HeaderBlock>

            <EmptyBlock />
        </>
    );
};

export default Header;