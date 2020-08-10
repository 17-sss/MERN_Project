import React from 'react';
import styled from 'styled-components';

const StyledBox = styled.div`
  background-color: ${(props) => props.backgroundColor || "rgb(69, 66, 105)"};
  color: ${(props) => props.color || "black"};
  width: ${(props) => props.width === undefined ? "100%" : props.width};  
  padding: ${props => props.padding === undefined ? "20px 0" : props.padding};
  margin-top: ${props => props.marginTop === undefined ? "0" : props.marginTop};
`;

const BoxModel = (props) => {
    console.log(props); 
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