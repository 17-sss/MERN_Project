import React from 'react';
import styled from 'styled-components';
import {StyledCustomLink} from '../common/StyleUtilModels'

const AuthTemplateBlock = styled.div`
    height: 50rem;
    padding-top: 5%;    

    /* flex로 내부 내용 중앙 정렬 샘플*/
    /*
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    */
`;

// 흰색 박스
const WhiteBox = styled.div`
    margin: 0 auto;

    .logo-area {
        display: block;
        padding-bottom: 2rem;
        text-align: center;
        font-weight: bold;
        letter-spacing: 2px;
    }

    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    padding: 3rem;
    width: 360px;
    background: white;
    border-radius: 2px;
`;

// Link 컴포넌트 디자인 변경
const StyledLink = styled(StyledCustomLink)`
    color: black;
    font-family: "Bauhaus 93";
`;

const AuthTemplate = ({children}) => {
    /* 
        매개변수 {children} 은
            /pages/LoginPage.js 
            or 
            RegisterPage.js 참고하면 알 수 있음
    */
    return (
        <AuthTemplateBlock>
            <WhiteBox>
                <div className="logo-area">
                    <StyledLink to = "/">novShop</StyledLink>
                </div>
                {children}
            </WhiteBox>
        </AuthTemplateBlock>
    );
};

export default AuthTemplate;