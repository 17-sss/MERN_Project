import React from 'react';
import {Link} from 'react-router-dom';
import styled, { css } from 'styled-components';
import {getSize} from '../../lib/utility/customFunc';
import { ClearEx } from '../common/StyleUtilModels';
import PostNoSearchBtnContainer from '../../containers/common/PostNoSearchBtnContainer';


// ========================================================================================
// [1] Login & Register
// ========================================================================================
// 1.1) Login & Register Wrapper
const LoginRegisterTemplateWrapper = styled.div`
    width: ${getSize(1.45)};   
    margin: 0 auto;
`;

// 1.2) Login & Register Multi Wrapper
const LoginRegisterMultiWrapper = styled.div`
    width: ${(props) => props.width || '51%'};
    margin: 10px auto;
    
    ${(props) =>
        props.type !== 'login' &&
        css`            
            border: 1px solid #eaeaea;
            padding: 10px;
            p.p_cation {
                font-size: 18px;
                color: gray;
                font-weight: bold;
            }            
        `};
    div.align_center {
        text-align: center;
        justify-content: center;
    }
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

// 3.1) css Input, Select
const cssLoginRegisterInputSelect = css`
    margin: 5px 0;
    border: none;
    border-bottom: 1px solid rgb(233, 233, 233);
    padding-bottom: 0.5rem;
    outline: none;

    font-size: 16px;

    &:focus {
        border-bottom: 1px solid rgb(209, 209, 209);
    }
`;
// 3.2) Input
const LoginRegisterInput = styled.input`
    ${cssLoginRegisterInputSelect};
    text-align: ${props => props.txtAlign ? props.txtAlign : "left"};
`;
// 3.3) Select
const LoginRegisterSelect = styled.select`
    ${cssLoginRegisterInputSelect}   
    min-height: 2.6rem;     
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
    const {type, onSubmit, onChange, form, error, phoneFrontList } = props;
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
                    
                    <LoginRegisterMultiWrapper type={type}>
                        {type==="register" &&
                            <p className="p_cation">
                                기본정보
                            </p>
                        }
                        <div className="align_center">
                            <LoginRegisterInput        
                                autoComplete="off"    
                                name="userid" 
                                placeholder="아이디" 
                                type="text"
                                onChange={onChange}
                                value={form.userid}
                                size="60"
                            />
                            <br/>
                            <LoginRegisterInput     
                                autoComplete="off"
                                name="userpwd"
                                placeholder="비밀번호"
                                type="password"
                                onChange={onChange}
                                value={form.userpwd}
                                size="60"
                            />
                            <br/>
                            {(type === "register") &&
                                <LoginRegisterInput                         
                                    autoComplete="off"
                                    name="userpwdConfirm"
                                    placeholder="비밀번호 확인"
                                    type="password"
                                    onChange={onChange}
                                    value={form.userpwdConfirm}
                                    size="60"
                                />
                            }
                        </div>
                    </LoginRegisterMultiWrapper>
                                          
                    {(type === "register") && 
                    <>                        
                        <LoginRegisterMultiWrapper>
                            <p className="p_cation">
                                이름 {'&'} 이메일
                            </p> 
                            <div className="align_center">
                                <LoginRegisterInput                         
                                    autoComplete="off"      
                                    name="username"
                                    placeholder="이름"
                                    type="text"
                                    onChange={onChange}
                                    value={form.username}
                                    size="60"
                                /> 
                                <br/>
                                <LoginRegisterInput                         
                                    autoComplete="off"      
                                    name="email"
                                    placeholder="이메일"
                                    type="email"
                                    onChange={onChange}
                                    value={form.email}    
                                    size="60"                        
                                />   
                            </div>
                            <br/>
                        </LoginRegisterMultiWrapper>

                        <LoginRegisterMultiWrapper>
                            <p className="p_cation">
                                연락처
                            </p>
                            <div className="align_center">
                                <LoginRegisterSelect
                                    style={{padding: "0 10px"}}
                                    name="phoneNumSelect"
                                    onChange={onChange}
                                    value={form.phonenumber.phoneNumSelect}
                                >
                                    {phoneFrontList && phoneFrontList.map((v, i) => (
                                        <option value={v} key={i}>
                                            {v}
                                        </option>
                                    ))}
                                </LoginRegisterSelect>
                                -
                                <LoginRegisterInput
                                    txtAlign={"center"}
                                    name="phoneNum1"
                                    type="text"
                                    onChange={onChange}
                                    value={form.phonenumber.phoneNum1}
                                    maxLength="4"
                                    size="20"                            
                                />
                                -
                                <LoginRegisterInput
                                    txtAlign={"center"}
                                    name="phoneNum2"
                                    type="text"
                                    onChange={onChange}
                                    value={form.phonenumber.phoneNum2}
                                    maxLength="4"
                                    size="20"
                                />
                            </div>      
                            <br />                     
                        </LoginRegisterMultiWrapper>
                        
                        <LoginRegisterMultiWrapper>
                            <p className="p_cation">
                                주소
                            </p> 
                            <div className="align_center">
                                <LoginRegisterInput                                                                  
                                    name="addressPostNo"                                
                                    type="text"
                                    placeholder="우편번호"
                                    onChange={onChange}
                                    value={form.address.addressPostNo}
                                    size="47"
                                    readOnly="1"                                
                                />
                                &nbsp;
                                {/* 우편번호 검색 API용 Container */}
                                <PostNoSearchBtnContainer
                                    typeId={'register'}
                                />
                                {/* -- */}
                                <br />
                                <LoginRegisterInput
                                    name="addressAddr1"
                                    type="text"
                                    placeholder="기본주소"
                                    onChange={onChange}
                                    value={form.address.addressAddr1}
                                    size="60"                                
                                    readOnly="1"
                                />
                                <br />
                                <LoginRegisterInput
                                    name="addressAddr2"
                                    type="text"
                                    placeholder="나머지주소 (선택입력가능)"
                                    onChange={onChange}
                                    value={form.address.addressAddr2}
                                    size="60"                                   
                                />    
                            </div>                                                    
                        </LoginRegisterMultiWrapper>
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