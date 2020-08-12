// 연습용 Block. 참고용
import React from 'react';
import styled from 'styled-components';

const StyledBox = styled.div`
  background-color: ${(props) => props.backgroundColor || "rgb(69, 66, 105)"};  
  width: ${(props) => props.width === undefined ? "100%" : props.width};  
  padding: ${props => props.padding === undefined ? "20px 0" : props.padding};
  margin: ${props => props.margin === undefined ? "0" : props.margin};
`;

const BoxModel = (props) => {
    return (
        <StyledBox {...props} />        
    );    
};
/*  
    - BoxModel 컴포넌트를 만드는 과정에서
        {…props}를 StyledBox에 설정해주었는데
        이는 BoxModel이 받아 오는 props를 모두 StyledBox 전달한다는 의미.
*/

export default BoxModel;