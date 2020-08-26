import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

const StyledSwipeItem = styled.div`
    ${(props) =>
        props.imageLink === undefined
        ? css`
            background-image: url('/logo512.png');
        `
        : css`
            background-image: url(${props.imageLink});
        `
    };

    ${(props) =>
        props.imageSize === undefined
         /* 옵션 메모: contain | cover | 100% 100% */
        ? css`
            background-size: cover; /* contain하면 화면 크기 바뀔때 같이 커졌다 작아졌다하심.. */
        `
        : css`
            background-size: ${props.imageSize};
        `
    };

    background-repeat: no-repeat;
    /* 옵션 메모: center center | center top */
    background-position: center top;
    display: block;

    color: ${(props) => props.color || '#FFF'};
    height: ${(props) => props.height || "680px"};
    width: ${(props) => props.width || "100%"};
    min-height: ${(props) => props.minHeight || "100%"};
    
    cursor: pointer;
`;

const SwipeItem = (props, /*{ children }*/ ) => {
    const [isPress, setIsPress] = useState(false);
    
    
    useEffect( () => {
        let link = props.to;
        
        if (isPress) {
            setTimeout(() => {               
                /* 
                    ** 메모 **
                    1. 0.12초 뒤에도 마우스가 눌려있으면 location.href를 실행하지 않음 || 반대라면 실행.
                    2. 참고사항
                        이 로직을 만드는 과정에서 아래 비교문이 boolean형일시에는 
                        마우스가 안눌려있음에도 불구하고 isPress는 true를 반환함. 
                        그래서 ref를 지정한 input의 value에 string형으로 적용함.
                        string형일시에는 원하는대로 작동함.
                */
                if (pressRef.current.value === 'false') {                    
                    global.location.href = link;
                }
            }, 120);
        }       
    }, 
        [
            isPress,
            props
        ]
    );

    const pressRef = useRef();

    return (
        <StyledSwipeItem            
            onMouseDown={() => setIsPress(true)}
            onMouseUp={() => setIsPress(false)}
            imageLink={props.imageLink}
            imageSize={props.imageSize}                                
            to={props.to}                 
        >  
            <input 
                type = 'hidden'
                ref={pressRef}                
                value = {isPress ? 'true' : 'false'} 
                readOnly
            />          
            
            {/* {children}  */}
        </StyledSwipeItem>
    );
};

export default SwipeItem;

