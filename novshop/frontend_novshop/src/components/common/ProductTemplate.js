import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import styled from 'styled-components';

const StyledCol = styled(Col)`
    background-color: ${(props) => props.backColor || "black"};
    height: 100px;
    
`;

const ProductTemplate = (props) => {
    return (
        <Container fluid>
            <Row className = 'row-cols-4'>
                <StyledCol backColor = 'red'></StyledCol>
                <StyledCol backColor = 'skyblue'></StyledCol>
                <StyledCol backColor = 'blue'></StyledCol>
                <StyledCol backColor = 'white'></StyledCol>
                <StyledCol backColor = 'green'></StyledCol>
                <StyledCol backColor = 'purple'></StyledCol>
                <StyledCol backColor = 'yellow'></StyledCol>
                <StyledCol backColor = 'black'></StyledCol>
            </Row>
        </Container>
    );
};

export default ProductTemplate;