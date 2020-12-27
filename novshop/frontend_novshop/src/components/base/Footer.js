import React from 'react';
import styled, { css } from 'styled-components';
import { getSize } from '../../lib/utility/customFunc';
import { CustomLink } from '../common/StyleUtilModels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';       // fab

const FooterWrapper = styled.div`
    ${(props) =>
        props.stype === 'logo'
            ? css`
                  width: ${getSize(1.35)};
                  margin: 0 auto;
                  text-align: ${props.align ? props.align : "left"};                  
              `
            : css`
                  width: ${getSize(1)};
                  margin: 0 auto;
                  padding: 2rem 0;
                  background-color: #f6f6f6;
              `}
`;

const FooterA = styled.a`
    text-decoration: none;
    color: black;
    &:hover {
        text-decoration: none;
        color: gray;
    }
    ${props => props.mr5 && css`margin-right: 5px;`}
`;

const Footer = () => {
    return (
        <FooterWrapper id="footer"> 
            <FooterWrapper stype="logo" align="center">
                <CustomLink 
                        to = '/'                         
                        margin="0"
                    >
                    <img 
                        src="/images/logo_Trans_small.png"
                        alt="logo"
                    />
                </CustomLink>  
                <FooterA href="https://github.com/17-sss" mr5>
                    <FontAwesomeIcon icon = {faGithub} size = 'lg'/>                        
                </FooterA>
                
                <FooterA href="https://www.instagram.com/17__sss/">
                    <FontAwesomeIcon icon = {faInstagram} size = 'lg'/>                        
                </FooterA>
                <br/>
                <span>Copyright 2020. ©Hoyoung. All Right Reserved.</span>
            </FooterWrapper>
        </FooterWrapper>
    );
};

export default Footer;
