import React from 'react';
import styled from 'styled-components';
import {StyledCustomLink, /* StyledTransparentBtn, MarginBlock */} from '../common/StyleUtilModels';

// ****************************************************************************************
// Font Awesome 관련 :: https://fontawesome.com/how-to-use/on-the-web/using-with/react
// ****************************************************************************************
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';       // fas
import { faUser } from '@fortawesome/free-regular-svg-icons';       // far
// import { faUser } from '@fortawesome/free-brands-svg-icons';     // fab
// ----------------------------------------------------------------------------------------/


// ========================================================================================
// ************* 헤더 Wrapper *************
// ========================================================================================
const StyledWrapper = styled.div`
    width: 1324px;
    height: 140px;
    position: relative;
    margin: 0 auto;
    /* background-color: #ccc; */
`;
// ----------------------------------------------------------------------------------------/


// ========================================================================================
// ************* 헤더 로고 *************
// ========================================================================================
const StyledTopLogo = styled.div`
    text-align: center;
    margin: 0 auto;    
    display: table;
    line-height: 140px;
`;

const StyledLogoLink = styled(StyledCustomLink)`        
    vertical-align: middle;
    /* display: table-cell; */
`;  
// ----------------------------------------------------------------------------------------/


// ========================================================================================
// ************* 헤더 유저 관련 (오른쪽) *************
// ========================================================================================
const StyledUserSection = styled.div`
    position: absolute;
    right: 5px;
    top: 70px;
`;

const StyledUserSectionLi = styled.li`      /* ul 태그는 styled 작업 안해도 될듯. */
    cursor: pointer;
`;

// ----------------------------------------------------------------------------------------/




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
                    <img 
                        src="/images/logo_Trans.png"
                        alt="logo"
                    />
                </StyledLogoLink>
            </StyledTopLogo>
            {/* 헤더 로고 END */}

            {/* 헤더 유저 관련 START */}
            <StyledUserSection>
                <ul>
                    <StyledUserSectionLi 
                        style = {{
                            float: 'left',
                            marginRight: '12px',
                        }}
                    >                         
                        <FontAwesomeIcon icon = {faUser} size = 'lg'/>    
                    </StyledUserSectionLi>

                    <StyledUserSectionLi
                        style = {{
                            float: 'left',
                            marginRight: '12px',
                            position: 'relative',  //                           
                        }}
                    >
                        <FontAwesomeIcon icon = {faShoppingBasket} size = 'lg' />                            
                    </StyledUserSectionLi>

                    <StyledUserSectionLi
                        style = {{
                            float: 'left',
                            // marginRight: '10px',
                            marginRight: '0px', // li:lastchild                            
                        }}
                    >
                        <FontAwesomeIcon icon = {faSearch} size = 'lg' />                
                    </StyledUserSectionLi>
                </ul>
            </StyledUserSection>
            {/* 헤더 유저 관련 END */}
            
        </StyledWrapper>
    );
};

export default Header;