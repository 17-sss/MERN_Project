
// **********************************************************************************
// *** getWidth: 비율에 따른 width ***
/* 
    window.outerWidth가 1920일때 비율이..
        1= 1920 / 1.45= 1324  / 1.5= 1280  / 2= 960  
*/
// **********************************************************************************
export const getWidth = (AnRatioStatic = 0, AbManual = undefined) => {
    let result = 0;

    if (!AbManual) {            // [1] ratio :: 비율 에 따른 width 계산
        if (AnRatioStatic > 0) {
            result = Math.floor(window.outerWidth / AnRatioStatic); // # Math.floor(): 소수점 버림.
        }                   // (AnRatioStatic가 0 이하 일 경우 미설정)
    } else {                    // [2] static :: 직접 입력
        // 숫자인지 먼저 확인 후.. (isNaN은 숫자가 아닐 경우 true를 반환하기에 !isNaN으로 작업)
        if (!isNaN(AnRatioStatic)) {    
            result = Math.floor(AnRatioStatic);
        }                    // (AnRatioStatic가 숫자가 아닐경우 미설정)
    }
        
    return (result + 'px');
};
