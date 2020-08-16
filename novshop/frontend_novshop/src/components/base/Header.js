import React from 'react';
import styled, {css} from 'styled-components';
import {MarginBlock, CustomLink} from '../common/StyleUtilModels';

// ***************************************************************************************************************
// ***************************************************************************************************************

// *** HeaderWrapper, 헤더 Wrapper ***
const HeaderWrapper = styled.div`
    position: ${(props) => props.position};
    background-color: ${(props) => props.backgroundColor || "white"};  
    width: ${(props) => props.width === undefined ? "100%" : props.width};  
    box-shadow: ${(props) => props.boxShadow || "rgba(0, 0, 0, 0.08) 0px 2px 4px"}; 
`;

// *** HeaderBlock, 헤더 Block ***
const HeaderBlock = styled.div`
    position: ${(props) => props.position && 'relative'};
    height: 90px;
`;

// *** HearderUl / Li ▶ 헤더 카테고리용 ui, li ***  [START]
/* 
    오른쪽으로 순서대로 정렬하기 위해, 
    ul 개체에서 float right 해준 후, 
    li 태그에서 float left  해주면 
    오른쪽으로 순서대로 정렬됨 
*/
const HeaderUl = styled.ul` 
    padding: ${props => props.padding === undefined ? "0.5rem 0 0 0" : props.padding};
    float: ${props => props.float || 'right'};
    position: ${props => props.posRelative && 'relative'};
`;

const HeaderLi = styled.li`
    margin-bottom: 0.5rem;
    float: ${props => props.float || 'left'};   

    ${props => props.vertical && 
        css`
            padding: 0 10px;
            &::after {
                content: '';
                display: inline-block;
                position: absolute;
                /* left: 0; */
                top: 10px;
                width: 1px;
                height: 15px;
                background-color: #ddd;
                vertical-align: top;
            }
            
        `    
    };
`;
// *** HearderUl / Li ▶ 헤더 카테고리용 ui, li ***  [END]

// *** HeaderLogo, 헤더 로고 ***
const HeaderLogo = styled.h1` 
    position: ${props => props.posAbsolute && 'absolute'};
    float: left;
    font-family: "Bauhaus 93";
    font-size: ${props => props.fontSize === undefined ? "23.5pt" : props.fontSize}; 
`;

// *** HeaderHr, 헤더 구분선 ***
const HeaderHr = styled.hr`
    margin: 0;
    border-top: 0.7px solid rgb(255, 253, 255);
`;



// *** EmptyBlock ***
// HeaderBlock position이 fixed일 경우 사용하는 (height 조절용) 컴포넌트
const EmptyBlock = styled.div`
    ${props => 
        props.off ||
        css`
            height: 6.6rem;
            background-color: rgb(255, 253, 255);
        `
    }
`;

// ***************************************************************************************************************
// ***************************************************************************************************************


const Header = (props) => {
    const categorySample = ['음식', '의류', '가구'];
    const authSample = ['로그인', '회원가입'];
    const authSample2 = ['알림', '주문/배송', '고객센터', '장바구니'];

    return (
        <>
            <HeaderWrapper id  = {props.id}>    

                <MarginBlock>  
                    <HeaderBlock>
                        <HeaderLogo posAbsolute>
                            <CustomLink 
                                to = '/'
                                margin = '0'   
                                hoveroff = 'true'
                            >
                                nov Shop
                            </CustomLink>
                        </HeaderLogo>    

                        <HeaderUl posRelative>        
                            {authSample.map((item, i) => {
                                return (
                                    <HeaderLi key = {i}>
                                        <CustomLink to = {() => {return item === '로그인' ? '/login' : '/member/join' }}>
                                            {item}
                                        </CustomLink>   
                                    </HeaderLi>
                                );
                            })}  
                            <HeaderLi vertical/>
                            {authSample2.map((item, i) => {
                                return (
                                    <HeaderLi key = {i}>
                                        <CustomLink to = {'/@' + i}>
                                            {item}
                                        </CustomLink>   
                                    </HeaderLi>
                                );
                            })}                             
                        </HeaderUl>  
                        <div style = {{clear: "right"}} />

                        <HeaderUl padding = '0' posRelative>
                            <HeaderLi key = ''>
                                <CustomLink to = '/'>
                                    1
                                </CustomLink>   
                            </HeaderLi>
                        </HeaderUl>
                        <div style = {{clear: "right"}} />

                        <HeaderUl padding = '0' posRelative>
                            <HeaderLi key = ''>
                                <CustomLink to = '/'>
                                    3
                                </CustomLink>   
                            </HeaderLi>
                        </HeaderUl>
                        <div style = {{clear: "right"}} />
                    
                    
                    </HeaderBlock>        
                </MarginBlock>
                
                <HeaderHr />

                <MarginBlock>
                    <HeaderUl>        
                        {categorySample.map((item, i) => {
                            return (
                                <HeaderLi key = {i}>
                                    <CustomLink to = {'/shopping/@' + i}>
                                        {item}
                                    </CustomLink>   
                                </HeaderLi>
                            );
                        })}                               
                    </HeaderUl>           

                    {/* ▼ 이거있어야 위에서 사용한 float right 무효화가능 */}
                    <div style = {{clear: "right"}} />
                </MarginBlock>


            </HeaderWrapper>

            <EmptyBlock off />
        </>
    );
};

export default Header;