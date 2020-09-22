import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {getSize} from '../../lib/utility/customFunc';


// ========================================================================================
// [1] Login & Register
// ========================================================================================
// 1) Login & Register Wrapper
const LoginRegisterTemplateWrapper = styled.div`
    width: ${getSize(1.45)};   
    margin: 0 auto;
`;
// ---------------------------------------------------/

// 2) form
const LoginRegisterForm = styled.form`
    width: 100%; 
    padding: ${getSize(10)};

    text-align: center;
    align-items: center;
    justify-content: center;
`;

// ---------------------------------------------------/

// 3) Input 박스
const LoginRegisterInput = styled.input`
    width: 51%;
    font-size: 16px;
    border: none;
    border-bottom: 1px solid rgb(233, 233, 233);
    padding-bottom: 0.5rem;
    outline: none;

    &:focus {        
        border-bottom: 1px solid rgb(209, 209, 209);
    }

    & + & {
        margin-top: 1rem;
    }
`;
// ---------------------------------------------------/

// 4) Button
const LoginRegisterBtn = styled.button`
    width: 51%;
    padding: 10px;
    margin-top: 1rem;
    border: none;

    &:hover {
        background-color: rgb(209, 209, 209);
    }
`;
// ---------------------------------------------------/


// ========================================================================================
// [2] Link 이동
// ========================================================================================
// 1) LinkFooter
const LinkFooter = styled.div`
    width: 75%;
    margin-top: 3rem;
    text-align: right;
`;
// ---------------------------------------------------/


// ========================================================================================
// [3] ErrorMessage
// ========================================================================================
// 1) ErrorMessage
const ErrorMessage = styled.div`
    color: red;
    font-size: 14px;
    margin: 10px 0 0 0;
    text-align: center;
`;


const objType = {
    login: '로그인',
    register: '회원가입',
}


const LoginRegisterTemplate = (props) => {
    const {type, onSubmit, onChange, form, error } = props;
    const typeValue = objType[type];
    
    return (
        <>
            <LoginRegisterTemplateWrapper>
                <LoginRegisterForm onSubmit = {onSubmit}>                                        
                    
                    <LoginRegisterInput        
                        autoComplete="on"    
                        name="userid" 
                        placeholder="아이디" 
                        type="text"
                        onChange={onChange}
                        value={form.userid}
                    />
                    {(type === "register") && 
                        <LoginRegisterInput                         
                            autoComplete="on"      
                            name="usernick"
                            placeholder="닉네임"
                            type="text"
                            onChange={onChange}
                            value={form.usernick}                            
                        />                        
                    }
                    <LoginRegisterInput                         
                        name="userpwd"
                        placeholder="비밀번호"
                        type="password"
                        onChange={onChange}
                        value={form.userpwd}
                    />  
                    {(type === "register") && 
                        <LoginRegisterInput                         
                            name="userpwdConfirm"
                            placeholder="비밀번호 확인"
                            type="password"
                            onChange={onChange}
                            value={form.userpwdConfirm}
                        />

                    }

                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    

                    <LoginRegisterBtn>
                        {typeValue}
                    </LoginRegisterBtn>                        
                    
                    <LinkFooter>                    
                        <Link 
                            style = {{color: "rgb(50, 50 ,50)"}}                    
                            to= {type === "login" ? "/auth/register" : "/auth/login" } 
                        >
                            {type === "login" ? "회원가입" : "로그인"}    
                        </Link>
                    </LinkFooter>
                    
                </LoginRegisterForm>




            </LoginRegisterTemplateWrapper>
        </>
    );
};

export default LoginRegisterTemplate;