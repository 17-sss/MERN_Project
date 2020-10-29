import React from 'react';
import styled from 'styled-components';
import { getSize } from '../../lib/utility/customFunc';

const FooterWrapper = styled.div`
    width: ${getSize(1)};
    margin: 0 auto;
    height: 5rem;
    background-color: #ccc;

    h1 {
        color: white;
        padding: 0 120px;
    }
`;

const Footer = () => {
    return (
        <>
            <FooterWrapper>
                <h1> THIS IS FOOTER</h1>
            </FooterWrapper>
        </>
    );
};

export default Footer;
