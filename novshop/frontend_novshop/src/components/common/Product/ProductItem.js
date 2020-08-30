import React from 'react';
import { Col } from 'react-bootstrap';
import styled, {css} from 'styled-components';

const StyledCol = styled(Col)`
    ${props => props.TestSize && css`
        height: 100px;
        width: 25%;
        margin: 10px;
    `}
`;

const ProductItem = (props) => {
    return (
        <StyledCol {...props}  />
    );
};

export default ProductItem;