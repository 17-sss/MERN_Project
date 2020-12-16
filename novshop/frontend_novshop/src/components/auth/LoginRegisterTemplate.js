import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {getSize} from '../../lib/utility/customFunc';
import { ClearEx } from '../common/StyleUtilModels';


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
    padding: 0 ${getSize(30)} ${getSize(30)};   // 상 0, 좌우 & 하 ${getSize(30)}

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
    width: 30%;
    padding: 10px;
    margin-top: 2rem;
    border: none;

    &:hover {
        background-color: rgb(209, 209, 209);
    }
`;
// ---------------------------------------------------/

// 5) 페이지 Name Wrapper
const LoginRegisterPageName = styled.div`
    width: 100%;
    min-height: 30px;
    margin: 50px 0 20px;
    border-bottom: 0;
    text-align: center;

    p#pageType {
        font-weight: 100;
        color: #222;
        font-size: 20px;
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
            <LoginRegisterPageName>
                <p id="pageType">
                    {(type === "register") ? '회원가입' : '로그인'}
                </p>
            </LoginRegisterPageName>

            <LoginRegisterTemplateWrapper>
                <LoginRegisterForm onSubmit = {onSubmit}>                                        
                    
                    <LoginRegisterInput        
                        autoComplete="off"    
                        name="userid" 
                        placeholder="아이디" 
                        type="text"
                        onChange={onChange}
                        value={form.userid}
                    />
                    <LoginRegisterInput     
                        autoComplete="off"
                        name="userpwd"
                        placeholder="비밀번호"
                        type="password"
                        onChange={onChange}
                        value={form.userpwd}
                    />  
                    {(type === "register") && 
                    <>
                        <LoginRegisterInput                         
                            autoComplete="off"
                            name="userpwdConfirm"
                            placeholder="비밀번호 확인"
                            type="password"
                            onChange={onChange}
                            value={form.userpwdConfirm}
                        />
                        <LoginRegisterInput                         
                            autoComplete="off"      
                            name="username"
                            placeholder="이름"
                            type="text"
                            onChange={onChange}
                            value={form.username}                            
                        /> 
                        <LoginRegisterInput                         
                            autoComplete="off"      
                            name="address"
                            placeholder="주소"
                            type="text"
                            onChange={onChange}
                            value={form.address}                            
                        />
                        <LoginRegisterInput                         
                            autoComplete="off"      
                            name="phonenumber"
                            placeholder="전화번호"
                            type="text"
                            onChange={onChange}
                            value={form.phonenumber}                            
                        /> 
                        <LoginRegisterInput                         
                            autoComplete="off"      
                            name="email"
                            placeholder="이메일"
                            type="email"
                            onChange={onChange}
                            value={form.email}                            
                        />       
                    </>
                    }

                    {error && <ErrorMessage>{error}</ErrorMessage>}                    
                    <ClearEx />

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