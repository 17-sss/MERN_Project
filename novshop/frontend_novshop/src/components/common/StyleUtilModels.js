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

export const MarginBlock = ({ children }) => {
    const MarginAndScroll = {
        margin: useCalcMargin(15),
        vertScrollWidth: undefined, /* useCalcVertScrollWidth(), 사용안하기로..*/
    };

    return (
        <StyledMargin MarginOption={MarginAndScroll}>
            {children}
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

    &:hover {
        ${(props) => props.hoveroff || 'color: rgb(83, 83, 83)'};
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
