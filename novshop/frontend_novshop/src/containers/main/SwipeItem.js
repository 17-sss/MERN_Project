import React from 'react';
import styled, {css} from 'styled-components';

const StyledSwipeItem = styled.div`
    ${(props) => props.backgroundImage === undefined ? 
        css `
            background-image: url('https://unsplash.it/475/205');
        `
        :
        css `
            background-image: url(${props.backgroundImage});
        `
    };
    
    background-size: contain; /* 옵션 메모: [1] cover, [2] 100% 100% */
    color: ${(props) => props.color || '#FFF'};
    padding: 10% 0%;
    cursor: pointer;
    /* 
    min-height: 100;
    padding: 15
    */
`;

const SwipeItem_onClick = (aLink) => {
    // e.preventDefault();
    return () => {
        global.location.href = aLink;
    };
};

const SwipeItem = (props, {children}) => {
    return (
        <StyledSwipeItem             
            onClick = {props.onClick || SwipeItem_onClick(props.to)}
            backgroundImage = {props.backgroundImage}
        >            
            {children}
        </StyledSwipeItem>
    )
};

export default SwipeItem;