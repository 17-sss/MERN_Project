import React, { useState, useEffect } from 'react';
import styled, {css} from 'styled-components';

const StyledSwipeItem = styled.div`
    ${(props) => props.imageLink === (undefined) ? 
        css `
            background-image: url('/logo512.png');
        `
        : 
        css `
            background-image: url(${props.imageLink});
        `              
    };

    ${(props) => props.imageSize === (undefined) ?
        /* 옵션 메모: contain | cover | 100% 100% */
        css`
            background-size: contain;
        `
        :
        css`
            background-size: ${props.imageSize};
        `
    };
    background-repeat: no-repeat;
    /* 옵션 메모: center center | center top */
    background-position: center top;
    display: block;
    color: ${(props) => props.color || '#FFF'};
    height: 610px;

    cursor: pointer;
    /* 
    min-height: 100;
    padding: 15
    */
`;


const SwipeItem = (props, {children}) => {
    const [isPress, setIsPress] = useState(false);
    
    useEffect( () => {
        let link = props.to;

        console.log(isPress);
        if (isPress) {
            setTimeout(() => {
                console.log('t-out', isPress);   // 1초뒤에 false가 되어도 True라 나옴..
                if (!isPress) {                    
                    global.location.href = link;
                }
            }, 1000);
        }       
    }, 
        [
            isPress, 
            // eslint-disable-next-line
            props.to
        ]
    );

    return (
        <StyledSwipeItem             
            // onMouseDown = {props.onMouseDown || SwipeItem_onMouseDown(props.to)}
            onMouseDown = {() => setIsPress(true)}
            onMouseUp = {() => setIsPress(false)}
            imageLink = {props.imageLink}
            imageSize = {props.imageSize}
        >            
            {children}            
        </StyledSwipeItem>
    )
};

export default SwipeItem;