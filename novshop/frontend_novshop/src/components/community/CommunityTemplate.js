import React from 'react';
import styled, { css } from 'styled-components';
import { getSize } from '../../lib/utility/customFunc';
import { CustomLink } from '../../components/common/StyleUtilModels';
import { cssTransparent } from "../../components/common/StyleUtilCSS";

// [1] CommunityWrapper: 전체 Wrapper
const CommunityWrapper = styled.div`
    width: ${(props) => props.width || getSize(1.4)};
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
    /* margin: 0 auto; */
    margin: 0 5%;
    width: 90%;
    border-top: 4px solid black;
`;
// ---------------------------------------------------/

// 2) Th
const StyeldTh = styled.th`
    width: ${(props) => props.width && props.width};
    border-bottom: 2px solid gray;
    height: 40px;

    text-align: center;
    align-items: center;
    justify-content: center;
`;
// ---------------------------------------------------/

// 3) Td
const StyeldTd = styled.td`
    width: ${(props) => props.width && props.width};
    border-bottom: 1px solid #575757;
    height: 30px;

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

// [4] 작성 폼
// 1) WriteWrapper
const WriteWrapper = styled.div`            
    width: 100%;
    margin-top: 10px;
    text-align: right;
    align-items: right;
    justify-content: right;
`;
// ---------------------------------------------------/

// 2) WriteLink, 분류에 따른 작성 폼으로 이동
const WriteLink = styled(CustomLink)`
    ${cssTransparent}
    padding: 2.5px;
    width: auto;
    height: 25px;
    box-shadow: 0 0 0 0.2px;
    border-radius: 1.4px;
    margin-right: 68px;
    
    &:hover {
        background-color: #c0c0c0;
        color: white;
    }
`;
// ---------------------------------------------------/


const CommunityTemplate = (props) => {
    const { data, etcData, events } = props;
    const {onCreateNotice} = events;
    const { subjectData, pageName } = etcData;

    return (
        <CommunityWrapper>
            <CommunityMultiWrapper stype="pagename">
                <p id="pageType">{pageName}</p>
            </CommunityMultiWrapper>

            <CommunityMultiWrapper stype="table">
                <StyledTable>
                    <thead>
                        <tr>
                            {subjectData &&
                                subjectData.map((v, i) => {
                                    return (
                                        <StyeldTh key={i} width={v.width}>
                                            {v.name}
                                        </StyeldTh>
                                    );
                                })}
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.map((v, i) => {
                                return (
                                    <tr key={i}>
                                        <StyeldTd>{v.RN || v.id}</StyeldTd>
                                        <StyeldTd align="left">
                                            <CustomLink to="#">
                                                {v.subject || v.sub}
                                            </CustomLink>
                                        </StyeldTd>
                                        <StyeldTd align="center">
                                            {v.userDisplayId}
                                        </StyeldTd>
                                        {pageName === '고객센터' && (
                                            <>                                                 
                                                <StyeldTd align="center">
                                                    {new Date(v.createdAt)
                                                        .toLocaleString()
                                                        .toLowerCase() !==
                                                        'invalid date' &&
                                                        new Date(
                                                            v.createdAt,
                                                        ).toLocaleString()}
                                                </StyeldTd>
                                                <StyeldTd align="center">
                                                    {v.view}
                                                </StyeldTd>
                                            </>
                                        )}
                                    </tr>
                                );
                            })}
                    </tbody>
                </StyledTable>
                <WriteWrapper>
                    <WriteLink>
                        글 작성
                    </WriteLink>
                </WriteWrapper>
            </CommunityMultiWrapper>
            <button onClick={onCreateNotice}>1</button>
        </CommunityWrapper>
    );
};

export default CommunityTemplate;
