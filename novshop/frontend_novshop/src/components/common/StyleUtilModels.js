import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useCalcMargin } from '../../lib/utility/customHooks';

// **********************************************************************************
// *** BoxModel (임시 레이아웃 채우기용..)  ***
// **********************************************************************************
const StyledBox = styled.div`
  background-color: ${(props) => props.backgroundColor || "rgb(69, 66, 105)"};  
  width: ${(props) => props.width === undefined ? "100%" : props.width};  
  padding: ${props => props.padding === undefined ? "20px 0" : props.padding};
  margin: ${props => props.margin === undefined ? "0" : props.margin};
`;

export const BoxModel = (props) => {
    return (
        <StyledBox {...props} />        
    );    

    /*  
    - BoxModel 컴포넌트를 만드는 과정에서
        {…props}를 StyledBox에 설정해주었는데
        이는 BoxModel이 받아 오는 props를 모두 StyledBox 전달한다는 의미.
    */
};


// **********************************************************************************
// *** 좌우 Margin  ***
// **********************************************************************************
const StyledMargin = styled.div`
    ${(props) => {
        if (props.MarginOption && props.MarginOption.margin) {
            if (props.MarginOption.vertScrollWidth) {
                let nLeft = props.MarginOption.margin;
                let nRight = (
                    props.MarginOption.margin -
                    props.MarginOption.vertScrollWidth
                );

                return css`
                    margin-left: ${nLeft + 'px'};
                    margin-right: ${nRight + 'px'};
                `;
            } else {
                return css`
                    margin: 0 ${props.MarginOption.margin + 'px'};
                `;
            }
        } else {
            return css`
                margin: 0 15%;
            `;
        }
    }}
`;

export const MarginBlock = (props) => {
    const MarginAndScroll = {
        margin: useCalcMargin(15),
        vertScrollWidth: undefined, /* useCalcVertScrollWidth(), 사용안하기로..*/
    };

    return (
        <StyledMargin MarginOption={MarginAndScroll}>
            {props.children}
        </StyledMargin>
    );
};

// **********************************************************************************
// *** 커스텀 Link 컴포넌트 1 ***
// **********************************************************************************
export const CustomLink = styled(Link)`
    text-decoration: none;
    margin: ${(props) => props.margin || '0 5px'};
    color: rgb(0, 0, 0);
    font-size: ${(props) => props.fontSize && props.fontSize};

    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;      
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

    ${(props) =>
        props.fullWidth &&
        css`
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
            width: 100%;
            font-size: 1.125rem;
        `}

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

export const Button = (props) => {
    return props.to ? (
        <StyledBtnLink
            {...props}
            // cyan = {props.cyan ? 1 : 0}
        />
    ) : (
        <StyledBtn {...props} />
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


// **********************************************************************************
// *** ClearEx : clear 태그 Control ***
// **********************************************************************************
export const ClearEx = styled.div`
    ${(props) => {
        if ((props.opt === "left") || (props.opt === "right") || (props.opt === "both")) {
            return css`clear: ${props.opt};`;
        } else {
            return css`clear: both;`;
        }
    }}
`;


// Dropdown 관련 START ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// **********************************************************************************
// *** Dropdown : Content ***
// **********************************************************************************
export const DropdownContent = styled.div`
    background-color: white;

    display: none;
    position: absolute;    
    min-width: 70px;
    padding: 8px;
    margin: ${props => props.margin || "0 0 0 -5px"};
    /* box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); */

    a {
        color: black; 
        padding: 0 3px;
        text-decoration: none; 
        display: block;

        &:hover {
            background-color: rgb(249, 249, 249);
        }
    }
`;


// **********************************************************************************
// *** Dropdown : '최상위'에 쓸 용도 (css) ***
// **********************************************************************************
/* 
    - Dropdown을 하는 부모 태그가 어느 것이 될지 모르니 스타일컴포넌트 자체가 아닌 css로 만들어놓음.
    - 태그가 아닌 CSS로 만들어 놓고 사용하려는 스타일컴포넌트 변수에 등록하기.
*/
export const cssDropdown = css`
    position: relative;
    display: inline-block;
    z-index: 10;   

    &:hover {
        /* .dropdown:hover .dropdown-button { background-color: #CD853F; }  < 참고용 */


        /* .dropdown:hover .dropdown-content { display: block; } */
        ${DropdownContent} {
            display: block;            
        } 
    }
`;
// Dropdown 관련 END ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒