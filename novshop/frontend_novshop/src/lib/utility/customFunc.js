
// **********************************************************************************
// *** getWidth: 비율에 따른 width ***
/* 
    1. 비율에 따른 값 예시
        1= 1920 / 1.45= 1324  / 1.5= 1280  / 2= 960  
    2. screen 객체 프로퍼티 (availWidth, availHeight)
        https://rdsong.com/2146
    2-1. window 객체 프로퍼티 (outerwidth, outerHeight, innerWidth, innerHeight)
        https://sometimes-n.tistory.com/22

        
*/
// **********************************************************************************
export const getSize = (AnRatioStatic = 0, AstrType = "width", AbManual = false, AbNopx = false) => {
    let result = 0;
    let screenSize = 0;
    
    if (AstrType === "width") {
        screenSize = global.screen.availWidth;
    } else if (AstrType === "height") {
        screenSize = global.screen.availHeight;
    } else {
        screenSize = global.screen.availWidth;  
    }

    if (!AbManual) {    // [1] ratio :: 비율 에 따른 값 계산
        if (AnRatioStatic > 0) {            
            result = Math.floor(screenSize / AnRatioStatic); // # Math.floor(): 소수점 버림.
        }                       // (AnRatioStatic가 0 이하 일 경우 미설정)
    } else {            // [2] static :: 직접 입력
        // 숫자인지 먼저 확인 후.. (isNaN은 숫자가 아닐 경우 true를 반환하기에 !isNaN으로 작업)
        if (!isNaN(AnRatioStatic)) {    
            result = Math.floor(AnRatioStatic);
        }                       // (AnRatioStatic가 숫자가 아닐경우 미설정)
    }
    
    let px = "px";
    if (AbNopx) px = '';
    return (result + px);
};
