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
            <Row className = 'row-cols-4' style = {{margin: '0 10%'}}>
                <StyledCol backColor = 'red'></StyledCol>
                <StyledCol backColor = 'skyblue'></StyledCol>
                <StyledCol backColor = 'blue'></StyledCol>
                <StyledCol backColor = 'yellow'></StyledCol>
                <StyledCol backColor = 'green'></StyledCol>
                <StyledCol backColor = 'purple'></StyledCol>
                <StyledCol backColor = 'orange'>{'https://getbootstrap.com/docs/4.5/layout/grid/'}</StyledCol>
                <StyledCol backColor = 'black'></StyledCol>
            </Row>
        </Container>
    );
};

export default ProductTemplate;