import React from 'react';
import { Container, Row } from "react-bootstrap";

const ProductList = ({children}) => {
    return (
        <Container fluid>
            <Row>
                {children}
            </Row>
        </Container>
    );
};

export default ProductList;