import styled, { css } from 'styled-components';
import { getSize } from '../../../lib/utility/customFunc';

// [1] CommonTableWrapper: 전체 Wrapper
const CommonTableWrapper = styled.div`
    width: ${(props) => props.width || getSize(1.45)};
    margin: 0 auto;
`;
// ---------------------------------------------------/

// [2]  CommonTableMultiWrapper
const CommonTableMultiWrapper = styled.div`
    width: 100%;

    ${(props) => {
        const { stype } = props;
        return stype === 'pagename'
            ? css`
                  min-height: 30px;
                  margin: 50px 0 20px;
                  border-bottom: 0;
                  text-align: center;

                  p#pageType {
                      font-weight: 100;
                      color: #222;
                      font-size: 20px;
                  }
              `
            : css`
                  margin: 0 auto 20px;
              `;
    }}
`;
// ---------------------------------------------------/


// [3] Styled된 테이블 관련 요소
// 1-1) Table
const StyledTable = styled.table`    
    width: 100%;
    border-top: 4px solid black;
`;

// 1-2) Th
const StyledTh = styled.th`
    /* width: ${(props) => props.width && props.width}; */
    /* colgroup 사용하여 다 변경하기 */
    border-bottom: 2px solid gray;
    height: 40px;

    text-align: center;
    align-items: center;
    justify-content: center;
`;

// 2) EmptyWrapper (빈 테이블 표시용)
const EmptyWrapper = styled.div`
    width: 100%;
    height: 40px;
    border-top: 4px solid black;
    border-bottom: 1px solid #575757;
    text-align: center;
    
    span {
        line-height: 30px;
        font-size: 12pt;
        font-weight: bold;
    }
`;
// ---------------------------------------------------/


export { CommonTableWrapper, CommonTableMultiWrapper, StyledTable, StyledTh, EmptyWrapper };
