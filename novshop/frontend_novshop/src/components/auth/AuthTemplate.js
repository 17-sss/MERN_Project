/* 
    해당 파일은 /src/pages/LoginPage.js & RegisterPage.js에서 쓰임. 
*/
import React from 'react';
import styled from 'styled-components';
import { getSize } from "../../lib/utility/customFunc";


const AuthTemplateBlock = styled.div`
    height: ${getSize(1.1, "height")};
    padding: 5.5rem 0 0 0;
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
    padding: 10rem;

    width: ${getSize(2.5)};    
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    background: white;
    
`;

const AuthTemplate = (props) => {    
    const {children} = props;
    return (
        <AuthTemplateBlock>
            <WhiteBox>
                {children}
            </WhiteBox>
        </AuthTemplateBlock>
    );
};

export default AuthTemplate;