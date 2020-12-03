// 구매 / 장바구니 Template
import React from 'react';
import styled, { css } from 'styled-components';
import { cssTransparent } from '../common/StyleUtilCSS';
import { ClearEx } from '../common/StyleUtilModels';
import {
    CommonTableWrapper as PurchaseWrapper,
    CommonTableMultiWrapper,
    StyledTable,
    StyledTh,
    StyeldTd,
    SubjectLink,
    // EmptyWrapper,
} from './common/CommonTableComponents';

// [1 : import] Wrapper
// 1) PurchaseWrapper (as로 CommonTableWrapper 자체를 가져옴)
// 2) PurchaseMultiWrapper
const PurchaseMultiWrapper = styled(CommonTableMultiWrapper)`
    ${(props) => {
        const { stype } = props;

        return stype === 'totalinfo'
            ? css`
                  width: 100%;
                  padding: 1rem 0;
                  border-bottom: 1px solid #e3e3e3;
                  background-color: #fbfafa;

                  span.totalprice {
                      font-size: 11.5pt;
                  }
              `
            : stype === 'buy' &&
                  css`
                      width: 100%;                      
                      height: 10rem; // 추후제거
                      border: 1px solid black;
                      margin-bottom: 10px;
                  `;
    }}
`;
// ---------------------------------------------------/

// [2 : import] Table 관련
// 1-1) table
const PurchaseTable = styled(StyledTable)`
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    font-size: 10pt;
`;

// 1-2) th
const PurchaseTh = styled(StyledTh)`
    height: 35px;
    border-bottom: 1px solid #e3e3e3;
`;

// 1-3) td
const PurchaseTd = styled(StyeldTd)`
    border-bottom: none;

    ul > li > span.lightgray {
        color: #a0a0a0;
    }

    // 수량 조절 버튼 불투명하게
    input[type='number'][name='volume'] {
        text-align: center;

        ::-webkit-inner-spin-button,
        ::-webkit-outer-spin-button {
            opacity: 1;
        }
    }

`;
// ---------------------------------------------------/

// [3] 기타
// 1) button
const PurchaseBtn = styled.button`
    ${cssTransparent}
    display: inline-block;
    width: auto;
    height: 25px;
    margin-right: 10px;    
    padding: 0 10px;

    border-radius: 2px;
    border: 1px solid #d1d1d1;
    
    background-color: ${props => props.name === "buyall" ? "#c0c0c0" : "white"};
    &:hover {
        background-color: ${props => props.name === "buyall" ? "#d6d6d6" : "#e6e6e6"};
    }
`;
// ---------------------------------------------------/

const PurchaseTemplate = (props) => {
    const { etcs } = props;
    const { page, colInfo } = etcs;

    return (
        <PurchaseWrapper>
            {/* == [1] 구매 / 장바구니 공용 ------------------------------------------------------------- */}
            <PurchaseMultiWrapper stype="pagename">
                <p id="pageType">
                    {page === 'shoppingcart'
                        ? '장바구니'
                        : page === 'buy'
                        ? '구매'
                        : ''}
                </p>
            </PurchaseMultiWrapper>
            
            <PurchaseMultiWrapper stype="table">
                <PurchaseTable>
                    {/* 장바구니 / 구매 분류 정보 (thead) */}
                    <colgroup>
                        {colInfo &&
                            colInfo.width.map((v, i) => (
                                <col style={{ width: v + '%' }} key={i} />
                            ))}
                    </colgroup>
                    <thead>
                        <tr style={{ backgroundColor: '#fbfafa' }}>
                            {colInfo &&
                                colInfo.value.map((v, i) => (
                                    <PurchaseTh scope="col" key={i}>
                                        {v === 'check' ? (
                                            <input
                                                type="checkbox"
                                                name="allselect"
                                            />
                                        ) : (
                                            v
                                        )}
                                    </PurchaseTh>
                                ))}
                        </tr>
                    </thead>

                    {/* 구매할 상품 리스트 (tbody) */}
                    <tbody>
                        <tr>
                            {page === 'shoppingcart' && (
                                <PurchaseTd>
                                    <input type="checkbox" name="select" />
                                </PurchaseTd>
                            )}

                            <PurchaseTd>
                                <div style={{ margin: '10px' }}>
                                    <img
                                        style={{ maxWidth: '75px' }}
                                        alt="test"
                                        src="/images/bymono_test2.webp"
                                    />
                                </div>
                            </PurchaseTd>
                            <PurchaseTd align="left">
                                <ul>
                                    <li>
                                        <SubjectLink to="/test">TEST SHIRT</SubjectLink>
                                    </li>
                                    <li>
                                        <b>[XL, 2XL, 3XL]</b>
                                    </li>
                                    <li>
                                        <span className="lightgray">
                                            [옵션: 그레이 / 3XL]
                                        </span>
                                    </li>
                                </ul>
                            </PurchaseTd>
                            <PurchaseTd>
                                <b>20,000원</b>
                            </PurchaseTd>
                            <PurchaseTd>
                                {page === "shoppingcart" ?
                                    (<input type="number" min="1" max="20" name="volume" value={2} />)
                                    :
                                    ("2")
                                }
                            </PurchaseTd>
                            <PurchaseTd>400</PurchaseTd>
                            <PurchaseTd>2,500</PurchaseTd>
                            <PurchaseTd>
                                <b>40,000원</b>
                            </PurchaseTd>                            
                        </tr>
                     </tbody>
                </PurchaseTable>

                {/* 총 상품금액 / btns (tfoot, div로 대체) */}
                <PurchaseMultiWrapper stype="totalinfo">
                    {/* [장바구니] 버튼 (삭제, 장바구니 비우기 등) */}
                    {page === 'shoppingcart' && (
                        <div style={{ float: 'left' }}>
                            <div style={{ marginLeft: '20px' }}>
                                <PurchaseBtn
                                    name="delselproduct"
                                    onClick={(e) => alert(e.target.innerHTML)}
                                >
                                    선택 상품 삭제
                                </PurchaseBtn>
                                <PurchaseBtn
                                    name="cleancart"
                                    onClick={(e) => alert(e.target.innerHTML)}
                                >
                                    장바구니 비우기
                                </PurchaseBtn>
                            </div>
                        </div>
                    )}
                    {/* 2) 총 상품금액 */}
                    <div style = {{float: "right"}}>
                        <span className="totalprice">
                            상품구매금액 <b>40,000</b> + 배송비 <b>2,500</b> =
                            합계 : <b>42,500</b>원
                        </span>
                    </div>
                    <ClearEx />
                </PurchaseMultiWrapper>
                
                {/* [장바구니] 상품 주문 버튼 */}
                {page === "shoppingcart" && (
                    <>
                    <div style={{ float: 'right', marginTop: '10px' }}>
                        <PurchaseBtn
                            name="buyall"
                            onClick={(e) => alert(e.target.innerHTML)}
                        >
                            전체상품주문
                        </PurchaseBtn>
                        <PurchaseBtn
                            name="buyselect"
                            onClick={(e) => alert(e.target.innerHTML)}
                        >
                            선택상품주문
                        </PurchaseBtn>
                    </div>
                    <ClearEx />
                </>
                )}

                {/*                 
                <EmptyWrapper>
                    <span>장바구니가 비어 있습니다.</span>
                </EmptyWrapper>
                */}
            </PurchaseMultiWrapper>

            {/* == [2] 구매 페이지 전용 ------------------------------------------------------------- */}
            {page === "buy" && (
                <PurchaseMultiWrapper stype="buy">
                    <span>유저 정보 (주소 등)</span>
                </PurchaseMultiWrapper>
            )}
            
        </PurchaseWrapper>
    );
};

export default PurchaseTemplate;
