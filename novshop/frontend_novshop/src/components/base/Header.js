import React from 'react';
import styled, {css} from 'styled-components';
import {StyledCustomLink, StyledClear, CSSDropdown, StyledDropdownContent} from '../common/StyleUtilModels';

// ****************************************************************************************
// Font Awesome 관련 :: https://fontawesome.com/how-to-use/on-the-web/using-with/react
// ****************************************************************************************
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingBasket, faBars } from '@fortawesome/free-solid-svg-icons';       // fas
import { faUser } from '@fortawesome/free-regular-svg-icons';       // far
// import { faUser } from '@fortawesome/free-brands-svg-icons';     // fab
// ----------------------------------------------------------------------------------------/

// 헤더 :: [공통] START ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ========================================================================================
// ************* 헤더용 Wrapper *************
// ========================================================================================
const StyledHeadWrapper = styled.div`
    width: 1324px;    
    position: relative;
    margin: 0 auto;
    /* background-color: #ccc; */
    
    /* type에 따라 height 조정 (Header & Category) */
    ${props => props.type === "Category" ? 
        css`    /* Category */ 
            height: 40px;
            border-bottom: 1px solid #f6f6f6;        
        `     
        : 
        css`    /* Header */ 
            height: 140px;
        ` 
    }
`;
// ----------------------------------------------------------------------------------------/ 


// ========================================================================================
// ************* 헤더 ul & li - [1] :: (헤더 Icons & 카테고리) *************
// ========================================================================================
const StyledHeadUL = styled.ul`
    /* type에 따른 Style (Header & Category) */
    ${(props) => props.type === "Category" ?
        css`    /* Category */
            height: 40px;
            line-height: 40px;
            padding-left: 33px;

            li {
                /* list-style-type: none; */
                float: left;
                padding: 0 15px;

                ${props.isdropdown && CSSDropdown}  /* isdropdown 있을시 dropdown 설정 */
            }
        `
        :
        css`    /* Header */
            li {
                float: left;
                margin-right: 12px;
                
                &:last-child {
                    margin-right: 0px;
                }
            }
        `
    }    
`;

// ----------------------------------------------------------------------------------------/ 
// 헤더 :: [공통] END ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒



// 헤더 :: [아이콘, 로고] START ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
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
// ************* 헤더 유저 / 전체 카테고리 (Icon)  *************
// ========================================================================================
const StyledIconSection = styled.div`
    position: absolute;

    ${(props) => {
        if (props.loc === "right")        
            return css`{right: 5px;}`
        else if (props.loc === "left")    
            return css`{left: 5px;}`
        else                            
            return css`{right: 5px;}`
    }}

    top: 70px;
`;
// ----------------------------------------------------------------------------------------/    
// 헤더 :: [아이콘, 로고] END ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒


const Header = (props) => {

// 카테고리 리스트 Item 생성 (임시) START
    const keys = [
        'quick', 'best', 'new', 'selfproduced', 'basic',
        'outer', 'knit', 'tshirt', 'shirt', 'pants', 'shoes',
        'accessory', 'sale', 'oneplus', 'big', 'community'
    ];
    const values =  [
        '퀵&당일발송', 'BEST', 'NEW 5%', '자체제작' ,'BASIC', 
        'OUTER', 'KNIT', 'T-SHIRT', 'SHIRT', 'PANTS', 'SHOES', 
        'ACCESSORY', 'SALE 80%', '1+1', 'BIG X BIG', 'COMMUNITY'
    ];

    const categoryList = [];
    keys.map( (item, i) => categoryList.push({key: item, value: values[i],}));
// 카테고리 리스트 Item 생성 (임시) END
    

    return (
        <>
            {/* *** 헤더 [아이콘, 로고] START *** */}

            <StyledHeadWrapper>
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


                {/* 헤더 전체 카테고리 (Icon) 관련 START */}
                <StyledIconSection
                    loc = "left"
                >
                    <ul>
                        <li>                         
                            <FontAwesomeIcon icon = {faBars} size = 'lg'/>    
                        </li>
                    </ul>
                </StyledIconSection>
                {/* 헤더 전체 카테고리 (Icon) 관련 END */}
                

                {/* 헤더 유저 (Icon) 관련 START */}
                <StyledIconSection>
                    <StyledHeadUL>
                        <li >                         
                            <FontAwesomeIcon icon = {faUser} size = 'lg'/>    
                        </li>

                        <li
                            style = {{
                                position: 'relative',  //                           
                            }}
                        >
                            <FontAwesomeIcon icon = {faShoppingBasket} size = 'lg' />                            
                        </li>

                        <li>
                            <FontAwesomeIcon icon = {faSearch} size = 'lg' />                
                        </li>
                    </StyledHeadUL>
                </StyledIconSection>
                <StyledClear />     {/* float 써서 clear: both 함 */}                
                {/* 헤더 유저 (Icon) 관련 END */}
            </StyledHeadWrapper>

            {/* *** 헤더 [아이콘, 로고] END *** */}

            <hr/>

            {/* *** 헤더 [카테고리] START *** */}
            <StyledHeadWrapper type = "Category">
                <StyledHeadUL  type = "Category" 
                    isdropdown // << 잘못된거지만 잠시..
                >                                    
                    {categoryList.map( (item, i) => {
                        return (
                            <li 
                                key = {item.key}
                                // isdropdown = {(i > 3)}  여기서 작동해야함. 부모인 StyledHeadUL에서 작동하면안대..
                            >                            
                                <StyledCustomLink
                                    to = {"/shopping/@" + item.key}
                                    margin = "0"                                                                     
                                >
                                    {item.value}
                                </StyledCustomLink>                                
                                {
                                    (i > 3) &&
                                        <StyledDropdownContent>
                                            <StyledCustomLink to="/#123">ONE</StyledCustomLink>    
                                            <StyledCustomLink to="/#234">TWO</StyledCustomLink>
                                        </StyledDropdownContent>    
                                }

                            </li>
                        );                        
                        
                    })}                                                     
                </StyledHeadUL>
                <StyledClear />
            </StyledHeadWrapper>    
            {/* *** 헤더 [카테고리] END *** */}

        </>
    );
};

export default Header;