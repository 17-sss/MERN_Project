import React from 'react';
import { Container, Row } from "react-bootstrap";
import styled from 'styled-components';

const StyledRow = styled(Row)``;

const ProductForm = ({children}) => {
    return (
        <Container>
            <StyledRow>
                {children}
            </StyledRow>
        </Container>
    );
};

export default ProductForm;