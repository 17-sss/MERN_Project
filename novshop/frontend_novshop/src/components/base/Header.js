import React from 'react';
import styled, {css} from 'styled-components';
import {MarginBlock, StyledCustomLink, StyledTransparentBtn} from '../common/StyleUtilModels';
// https://fontawesome.com/how-to-use/on-the-web/using-with/react
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

// ========================================================================================
// ************* 헤더 Wrapper *************
// ========================================================================================
const StyledWrapper = styled.div`
    width: 1324px;
    height: 140px;
    position: relative;
    margin: 0 auto;
    background-color: #ccc;
`;
// ----------------------------------------------------------------------------------------


// ========================================================================================
// ************* 헤더 로고 *************
// ========================================================================================
const StyledTopLogo = styled.div`
    text-align: center;
    margin: 0 auto;    
    display: table;
    line-height: 140px;
    height: 140px;
    width: 200px;
    /*
    background-image: url("/images/logo_Trans.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    */
`;

const StyledLogoLink = styled(StyledCustomLink)`
    display: table-cell;
    vertical-align: middle;
    background-color: white;
`;  
// ----------------------------------------------------------------------------------------


// ========================================================================================
// ************* 헤더 유저 관련 (오른쪽) *************
// ========================================================================================
const StyledUserSection = styled.div`
    position: absolute;
    right: 5px;
    top: 70px;
`;

const StyledUserSectionLi = styled.li`      /* ul 태그는 styled 작업 안해도 될듯. */

`;


// ----------------------------------------------------------------------------------------




const Header = (props) => {
    return (
        <StyledWrapper>
            {/* 헤더 로고 START */}
            <StyledTopLogo>
                <StyledLogoLink 
                    to = '/' 
                    hoveroff = {"true"}
                    margin="0"
                >
                    <img src="/images/logo_Trans.png"></img>
                </StyledLogoLink>
            </StyledTopLogo>
            {/* 헤더 로고 END */}

            {/* 헤더 유저 관련 START */}
            <StyledUserSection>
                <ul>
                    <StyledUserSectionLi 
                        style = {{
                            float: 'left',
                            marginRight: '10px',
                        }}
                    >                         
                        <FontAwesomeIcon icon = {faSearch} style = {{color: 'black',}} />    
                    </StyledUserSectionLi>

                    <StyledUserSectionLi
                        style = {{
                            float: 'left',
                            marginRight: '10px',
                            position: 'relative',  //                           
                        }}
                    >
                        <FontAwesomeIcon icon = {faSearch} style = {{color: 'red',}} />    
                    </StyledUserSectionLi>

                    <StyledUserSectionLi
                        style = {{
                            float: 'left',
                            // marginRight: '10px',
                            marginRight: '0px', // li:lastchild                            
                        }}
                    >
                        <FontAwesomeIcon icon = {faSearch} style = {{color: 'blue',}} />                
                    </StyledUserSectionLi>
                </ul>
            </StyledUserSection>
            {/* 헤더 유저 관련 END */}
            
        </StyledWrapper>
    );
};

export default Header;