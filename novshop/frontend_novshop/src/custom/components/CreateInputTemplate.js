import React from 'react';
import styled from "styled-components";
import { MdAdd } from "react-icons/md";

// **********************************************************************************
// *** CreateInputResult : CreateInputForm에서 만든 Item
// **********************************************************************************
const ResultWrapper = styled.div`
    ${props => props.css && props.css}
    width: ${props => props.width ? props.width : "100%"};
`;

export const CreateInputResult = (props) => {
    const {resultopt} = props;
    

    return (
        <ResultWrapper
            css = {resultopt.css}
            width = {resultopt.width}            
        >
            테스트
        </ResultWrapper>
    );
};



// **********************************************************************************
// *** CreateInputForm : 다중 항목 생성용 input 컴포넌트 (최상위는 form) ***    [default]
// **********************************************************************************
const Input = styled.input`
    ${props => props.css && props.css}
    width: ${props => props.width && props.width};
`;

const Button = styled.button`
    background: none;
    outline: none;
    border: none;

    ${props => props.css && props.css}
    width: ${props => props.width && props.width};
`;

const CreateInputForm = (props) => {
    const {inputopt, btnopt, onChange, onSubmit, value} = props;       

    return (
        <form onSubmit = {onSubmit}>
            <Input 
                css = {inputopt.css}
                width = {inputopt.width || '90%'}
                
                name = {inputopt.name || 'createinput'}
                value = {value}
                placeholder = {inputopt.placeholder || '내용을 입력하세요'}  
                onChange = {onChange}                
            />
            <Button
                css = {btnopt.css}
                width = {btnopt.width || '10%'}
                type = 'submit'
            >
                <MdAdd />
            </Button>
        </form>
    )
};


export default CreateInputForm;