// LoginRegisterTemplate는 ReactBook의 "components/auth/AuthForm" 임
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from '../common/StyleUtilModels';

const LoginRegisterTemplateBlock = styled.div`  
    h4 {
        margin: 0;
        color: gray;
        margin-bottom: 1rem;
    }
`;

// 스타일링된 input
const StyledInput = styled.input`
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid rgb(233, 233, 233);
    padding-bottom: 0.5rem;
    outline: none;
    width: 100%;

    &:focus {
        color: rgb(209, 209, 209);
        border-bottom: 1px solid rgb(209, 209, 209);
    }

    & + & {
        margin-top: 1rem;
    }
`;

// 폼 하단에 로그인 혹은 회원가입 링크를 보여 줌
const Footer = styled.div`
    margin-top: 2rem;
    text-align: right;

    /* ▼ Link 컴포넌트에도 적용됨  */
    a {
        color: rgb(53, 53, 53);        
        text-decoration: none;

        &:hover {
            color:  rgb(122, 122, 122);
        }
    }
`;

const BtnMarginTop = styled(Button)`
    margin-top: 1rem;
`;

const textMap = {
    login: '로그인',
    register: '회원가입',
};



// 에러를 보여줌
const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size: 0.875rem;
    margin-top: 1rem;
`;

const LoginRegisterTemplate = ({type, form, onChange, onSubmit, error}) => {
    const text = textMap[type];     
    return (        
        <LoginRegisterTemplateBlock>                 
            <h4>{text}</h4>
            <form onSubmit = {onSubmit}>
                <StyledInput 
                    autoComplete="username" 
                    name="username" 
                    placeholder="아이디" 
                    onChange={onChange}
                    value={form.username}
                />
                <StyledInput 
                    autoComplete = "new-password"
                    name="password"
                    placeholder="비밀번호"
                    type="password"
                    onChange={onChange}
                    value={form.password}
                />

                {type === 'register' && (
                    <StyledInput 
                        autoComplete = "new-password"
                        name="passwordConfirm"
                        placeholder="비밀번호 확인"
                        type="password"
                        onChange={onChange}
                        value={form.passwordConfirm}
                    />
                )}

                {error && <ErrorMessage>{error}</ErrorMessage>}                         
                <BtnMarginTop fullWidth>{text}</BtnMarginTop>

            </form>
            <Footer>                               
                { type === 'login' ? (
                    <Link to = "/member/join">회원가입</Link>
                ) : (
                    <Link to = "/login">로그인</Link> 
                )}                            
            </Footer>
        </LoginRegisterTemplateBlock>
    );
}


export default LoginRegisterTemplate;