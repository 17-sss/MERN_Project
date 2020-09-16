// 액션 타입 정의하는 function
export const createRequestActionTypes = (type) => {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;
    return [type, SUCCESS, FAILURE];
};