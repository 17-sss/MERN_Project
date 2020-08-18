import React from 'react';
import styled, {css} from 'styled-components';
import { Link } from 'react-router-dom';
import {useScrollBarWidthMinusMargin} from '../../lib/hook/Util';

// **********************************************************************************
// *** 좌우 Margin  ***
// **********************************************************************************
// const StyledMargin = styled.div`
//     ${props.margin }
//     margin: ${props => props.margin === undefined ? "0 15%" : props.margin}; 
// `;

export const MarginBlock = ({children}) => {
    const calcMargin = useScrollBarWidthMinusMargin(15);
    
    return (        
        <div style={{
            marginLeft: (calcMargin + 'px'),
            marginRight: (calcMargin + 'px'),
        }}>
            {children}
            {calcMargin} s
        </div>
    );
    // return <div style = {{margin: "0 15%"}}>{children} </div>
};

// **********************************************************************************
// *** 커스텀 Link 컴포넌트 1 ***
// **********************************************************************************
export const CustomLink = styled(Link)`
    text-decoration: none;
    margin: ${props => props.margin || "0 5px"};
    color: rgb(0, 0, 0);    

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }

    &:hover {
        ${props => props.hoveroff || 
            "color: rgb(83, 83, 83)"};
    }
`;
// **********************************************************************************
// *** 커스텀 버튼 : <Link> or <button> ***
// **********************************************************************************
// 커스텀 버튼 : <Link> or <button> 디자인 START
const ButtonStyle = css`
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.25rem 1rem;
    color: white;
    outline: none;
    cursor: pointer;
    
    background: rgb(115, 171, 255);
    &:hover {
        background: rgb(152, 200, 255);
    }


    ${props =>
        props.fullWidth &&
        css`
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
            width: 100%;
            font-size: 1.125rem;
        `
    }
 
    &:disabled { 
        background: black;
        color: gray;
        cursor: not-allowed;
    }
    
`;


const StyledBtn = styled.button`
    ${ButtonStyle}
`;

const StyledBtnLink = styled(Link)`
    ${ButtonStyle}
`;

export const Button = props => {
    return props.to ? (
        <StyledBtnLink 
            {...props} 
            // cyan = {props.cyan ? 1 : 0} 
        />
    ) : (
        <StyledBtn  {...props} />
    );
};
// 커스텀 버튼 : <Link> or <button> 디자인 END

// **********************************************************************************
// *** 커스텀 버튼 : 투명 ***
// **********************************************************************************
export const TransparentBtn = styled.button`
    background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
    outline: inherit;
`;

