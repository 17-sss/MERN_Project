import React from "react";
import styled, {css} from "styled-components";
import { getSize } from "../../lib/utility/customFunc";

// [1] CommunityViewWrapper: 전체 Wrapper
const CommunityViewWrapper = styled.div`
    width: ${getSize(1.45)};
    margin: 0 auto;
`;
// ---------------------------------------------------/

// [2] CommunityMultiWrapper
const CommunityMultiWrapper = styled.div`
    width: 100%;

    ${(props) => {
        const { stype } = props;
        switch (stype) {
            case 'pagename': // 타입 (공지, CS)등을 이름을 표시하기 위한 틀 생성
                return css`
                    min-height: 30px;
                    margin: 50px 0 20px;
                    border-bottom: 0;
                    text-align: center;

                    p#pageType {
                        font-weight: 100;
                        color: #222;
                        font-size: 20px;
                    }
                `;
            case 'table': // 테이블
                return css`
                    margin: 0 auto 20px;
                `;
            default:
                break;
        }
    }}
`;
// ---------------------------------------------------/

// [3] Styled된 테이블 관련 요소
// 1) Table
const StyledTable = styled.table`
    width: 100%;
`;

// 2) Td
const StyeldTd = styled.td`
    width: ${(props) => props.width && props.width};
    height: 30px;
    border: 0.2px solid black;

    ${(props) => {
        let { align } = props;
        align = align || 'center';

        return css`
            text-align: ${align};
            align-items: ${align};
            justify-content: ${align};
        `;
    }};
`;
// ---------------------------------------------------/

const CommunityViewTemplate = (props) => {
    const {etcDatas} = props;
    const {pageName} = etcDatas;
    return (
        <CommunityViewWrapper>
            <CommunityMultiWrapper stype="pagename">
                <p id="pageType">{pageName}</p>
            </CommunityMultiWrapper>
            <CommunityMultiWrapper stype="table">
                <form onSubmit={()=>alert("1")}>
                    <StyledTable>
                        <tbody>
                            <tr>
                                <StyeldTd width="10%">제목</StyeldTd>
                                <StyeldTd width="90%" align="left">b2</StyeldTd>
                            </tr>
                            <tr>
                                <StyeldTd width="10%">작성자</StyeldTd>
                                <StyeldTd width="90%" align="left">c2</StyeldTd>
                            </tr>
                        </tbody>

                    </StyledTable>

                    <button type="submit">1</button>
                </form>
            </CommunityMultiWrapper>
        </CommunityViewWrapper>
    )
};

export default CommunityViewTemplate;