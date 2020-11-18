import React from 'react';
import styled, { css } from 'styled-components';
import { getSize } from '../../lib/utility/customFunc';
import { CustomLink } from '../../components/common/StyleUtilModels';
import { cssTransparent } from "../../components/common/StyleUtilCSS";

// [1] CommunityWrapper: 전체 Wrapper
const CommunityWrapper = styled.div`
    width: ${(props) => props.width || getSize(1.45)};
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

// 4) Link Custom
const SubjectLink = styled(CustomLink)`
    &:hover {
        color: #666;
    }
`;

// [4] 페이징
// 1) PagingWrapper: 페이징관련 개체들 Wrapper
const PagingWrapper = styled.div`
    display: inline-block;
    position: relative;
    width: 100%;
    margin: 0 auto;
    margin-top: 10px;

    text-align: center;
    justify-content: center;
    align-items: center;
`;
// ---------------------------------------------------/

// 2) PagingBtn: 페이지 번호용 btn
const PagingBtn = styled.input`
    ${cssTransparent};
    font-size: 8pt;
    width: 20px;
    height: 20px;
    margin-left: 4px;    
    box-shadow: 0 0 0 0.2px;
    background-color: ${props => props.selectbtn ? "#c0c0c0" : "ffffff"};
`;
// ---------------------------------------------------/

// [5] 작성 폼
// 1) WriteWrapper
const WriteWrapper = styled.div`            
    display: inline-block;                
    position: absolute;
    right: 60px;
    width: auto;
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
    
    &:hover {
        background-color: #c0c0c0;
        color: white;
    }
`;
// ---------------------------------------------------/


const CommunityTemplate = (props) => {
    const { data, etcData, events } = props;
    const { pagingBtnClick } = events;
    const { subjectData, pageName, page, pageCount, currentPage } = etcData;

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
                                            <SubjectLink to={"?num="+v.id}>
                                                {v.subject || v.sub}
                                            </SubjectLink>
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

                <PagingWrapper>
                {(pageCount > 0) &&                    
                    [...Array(pageCount)].map((v, i) => {   // map대신 for문 쓰고 싶을 때
                        let index = (i+1);
                        let selectbtn = (index === Number(currentPage));
                        return (
                            <PagingBtn
                                key={i}
                                type="button"
                                onClick={pagingBtnClick}
                                selectbtn={selectbtn}
                                value={index}
                            />
                        );
                    })}                

                    <WriteWrapper>
                        <WriteLink to = {'/write/' + page }>
                            글 작성
                        </WriteLink>
                    </WriteWrapper>
                </PagingWrapper>   

            </CommunityMultiWrapper>            
        </CommunityWrapper>
    );
};

export default CommunityTemplate;
