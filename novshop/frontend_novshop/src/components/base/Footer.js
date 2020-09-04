import React from 'react';
import styled from 'styled-components';
import {getWidth} from '../../lib/utility/customFunc'

const FooterWrapper = styled.div`
    width: ${getWidth(1)};
    position: relative;
    margin: 0 auto;

    /* 임시 START */
    height: 5rem;
    background-color: #ccc;
    
    h1 {
        color: white;        
        padding: 0 120px;
    }
    /* 임시 END */
`

const Footer = () => {
    return (
        <>
            <FooterWrapper>
                <h1> THIS IS FOOTER</h1>
            </FooterWrapper>
        </>
    )
};

export default Footer;