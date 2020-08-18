import { useState, useEffect } from 'react';

// **********************************************************************************
// *** useWindowSize : Window개체 innerWidth & innerHeight 가져오기 ***
// **********************************************************************************
/* 
// 사용 예제
function App() {
  const size = useWindowSize();

  return (
    <div>
      {size.width}px / {size.height}px
    </div>
  );
}
*/

// 훅
export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        // 창 크기 정보를 호출하는 핸들러
        function handleResize() {
            // 창 너비/높이를 state 설정
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // window 객체에 이벤트 리스너 추가 [1]
        window.addEventListener('resize', handleResize);

        // 초기 창 크기로 상태를 업데이트하도록 즉시 핸들러 호출 [2]
        handleResize();

        // window 객체에 등록된 이벤트 리스너 제거 [3]
        return () => window.removeEventListener('resize', handleResize);
    }, []); // 빈 배열을 사용하면 마운트시에만 효과가 실행됨

    return windowSize;
};

// **********************************************************************************
// *** getScrollBarWidth *** 스크롤바 width 계산
// **********************************************************************************
export const useScrollBarWidth = () => {
    const [scrollBarWidth, setScrollBarWidth] = useState(0);
    const winInnerWidth = window.innerWidth;

    useEffect(() => {
        setScrollBarWidth(
            window.innerWidth - document.documentElement.clientWidth,
        );
    }, [winInnerWidth]);

    return scrollBarWidth;

    /*  
  docClientWidth: document.documentElement.clientWidth,
  docClientHeight: document.documentElement.clientHeight,
*/
};

// **********************************************************************************
// *** useScrollBarWidthMinusMargin *** Margin에 적용할 값 계산 (window.innerWidth 에서 스크롤바 width를 뺀 값 계산)
// 리듀서로 변경해야할듯
// **********************************************************************************
/* // 리듀서로 변경하다맘
function calcMarginReducer(state, action) {  
    let calcMargin = state.value;
    let marginPer = 0;

    if (action.percent <= 0) {
        marginPer = 0;
    } else if (action.percent < 100) {
        marginPer = action.percent * 0.01; 
    } else {
        marginPer = 0;
    }
    
    // 스크롤바 넓이 계산
    let scrollBarWidth = (window.innerWidth - document.documentElement.clientWidth);

    // 적용될 마진 계산 
    if (!scrollBarWidth) {
      calcMargin = (window.innerWidth * marginPer);
    } else {
      calcMargin = (window.innerWidth * marginPer + scrollBarWidth / 2);
    }

    return calcMargin;
};

export const useCalcMargin = () => {
  // const [state, dispatch] = useReducer(calcMarginReducer, {value: 0}0)
  // 더 연구 요망
}
*/ 

export const useScrollBarWidthMinusMargin = (AmarginPercent) => {
    const [scrollBarWidth, setScrollBarWidth] = useState(0);
    const [calcMargin, setCalcMargin] = useState(0);

    const winInnerWidth = window.innerWidth;

    useEffect(() => {
        let marginPer = 0;
        if (AmarginPercent <= 0) marginPer = 0;
        else if (AmarginPercent < 100) marginPer = AmarginPercent * 0.01;
        else marginPer = 0;

        // 스크롤바 넓이 계산
        setScrollBarWidth(
            window.innerWidth - document.documentElement.clientWidth,
        );

        // 적용될 마진 계산
        if (!scrollBarWidth) {
            setCalcMargin(winInnerWidth * marginPer);
        } else {
            setCalcMargin(winInnerWidth * marginPer + scrollBarWidth / 2);
        }
    }, [winInnerWidth]);

    return calcMargin;
};

