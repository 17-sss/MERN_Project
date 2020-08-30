import React from 'react';
import { Container, Row } from "react-bootstrap";
import styled, {css} from 'styled-components';

const StyledRow = styled(Row)` 
    ${(props) => props.MgLR5 && css`margin: 0 5%;`};
`;

const ProductList = (props) => {
    return (
        <Container fluid>
            <StyledRow {...props}>
                {props.children}
            </StyledRow>
        </Container>
    );
};

export default ProductList;