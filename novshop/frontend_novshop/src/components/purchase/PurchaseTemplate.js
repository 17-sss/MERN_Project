// 구매 / 장바구니 Template
import React from 'react';
import styled, { css } from 'styled-components';
import { cssDisplayNone, cssStrike, cssTransparent } from '../common/StyleUtilCSS';
import { ClearEx } from '../common/StyleUtilModels';
import {
    CommonTableWrapper as PurchaseWrapper,
    CommonTableMultiWrapper,
    StyledTable,
    StyledTh,
    StyledTd,
    SubjectLink,
    // EmptyWrapper,
} from '../common/CommonTableComponents';
import { threeDigitsComma } from "../../lib/utility/customFunc";

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
                  .shippingfeeInfo {
                      margin-top: 10px;
                      text-align: center;
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

// [2] Table 관련
// 1-1) table (import)
const PurchaseTable = styled(StyledTable)`
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    font-size: 10pt;
`;

// 1-2) th (import)
const PurchaseTh = styled(StyledTh)`
    height: 35px;
    border-bottom: 1px solid #e3e3e3;
`;

// 1-3) td (import)
const PurchaseTd = styled(StyledTd)`
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

// 2) PurchaseIsSaleP: 세일 여부에 따른 원가격표시
const PurchaseIsSaleP = styled.p`
    ${props => {
        const {sale} = props;
        const flag = (sale && sale > 0 && sale < 1);
        return flag ? cssStrike : cssDisplayNone;
    }}
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
    const { etcs, data, events } = props;
    const { page, colInfo } = etcs;    
    const { onChange } = events;

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
                        {data && data.items && data.items.length > 0 && data.items.map((v, i) => {
                            const {
                                product: { image, name, price, sale, mileage, sizes, categoryId, categorySub },
                                id, selcolor, selsize, volume, productId, /* userId */
                            } = v;


                            let aLink = '/shopping';
                            if (!categoryId && !categorySub) {
                                aLink = aLink + `?itemId=${productId}`;
                            } else if (categoryId && !categorySub) {
                                aLink = aLink + `?main=${categoryId}&itemId=${id}`;
                            } else if (categoryId && categorySub) {
                                aLink = aLink + `?main=${categoryId}&sub=${categorySub}&itemId=${productId}`;
                            }                            

                            const calcPrice = Math.round(price - (price * sale));
                            const fixMile = threeDigitsComma(Math.round(mileage * volume));
                            
                            return (
                                <tr key = {i}>
                                    {page === 'shoppingcart' && (
                                        <PurchaseTd>
                                            <input
                                                type="checkbox"
                                                name="select"
                                            />
                                        </PurchaseTd>
                                    )}

                                    <PurchaseTd>
                                        <div style={{ margin: '10px' }}>
                                            <img
                                                style={{ maxWidth: '75px' }}
                                                alt={name}
                                                src={'/uploads/' + image || '/images/bymono_test1.webp'}
                                            />
                                        </div>
                                    </PurchaseTd>
                                    <PurchaseTd align="left">
                                        <ul>
                                            <li>
                                                <SubjectLink
                                                    to={aLink}
                                                    style={{
                                                        margin: '0',
                                                        padding: '0',
                                                    }}
                                                >
                                                    {name}
                                                </SubjectLink>
                                            </li>
                                            <li>
                                                <b>{"[" + JSON.parse(sizes).join(", ") + "]"}</b>
                                            </li>
                                            <li>
                                                <span className="lightgray">
                                                    [옵션: {selcolor} / {selsize}]
                                                </span>
                                            </li>
                                        </ul>
                                    </PurchaseTd>
                                    <PurchaseTd>
                                        <PurchaseIsSaleP sale={sale}>
                                            {threeDigitsComma(price)}원                                            
                                        </PurchaseIsSaleP>
                                        <b>
                                            {sale && (sale > 0 && sale < 1) 
                                                ? (threeDigitsComma(calcPrice))
                                                : (threeDigitsComma(price))
                                            }원
                                        </b>
                                        <div style={
                                            sale && sale <= 0 
                                                ? {textDecoration:"line-through"} 
                                                : {display: "none !important"}
                                            }
                                        >
                                           
                                        </div>
                                        
                                    </PurchaseTd>
                                    <PurchaseTd>
                                        {page === "shoppingcart" ?
                                            (<input type="number" min="1" max="20" name="volume" value={volume} />)
                                            :
                                            volume
                                        }
                                    </PurchaseTd>
                                    
                                    <PurchaseTd>{fixMile}</PurchaseTd>                                                             
                                    <PurchaseTd>
                                        <b>{threeDigitsComma(calcPrice * volume)}원</b>
                                    </PurchaseTd> 
                                </tr>        
                            );
                        })}
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
                            상품구매금액{' '}
                            <b>
                                {data && data.allProductPrice
                                    ? data.allProductPrice
                                    : 'ERR!!'}
                            </b>{' '}
                            + 배송비{' '}
                            <b>
                                {data && data.shippingFee
                                    ? data.shippingFee
                                    : 'ERR!!'}
                            </b>{' '}
                            = 합계 :{' '}
                            <b>
                                {data && data.totalPrice
                                    ? data.totalPrice
                                    : 'ERR!!'}
                            </b>
                            원
                        </span>
                        <ClearEx />

                        <div className="shippingfeeInfo">
                            <span>
                                상품구매금액{' '}
                                <b style={{color: "red", textDecoration: "underline"}}>
                                    30,000
                                </b>
                                {' '}이상 무료배송
                            </span>
                        </div>
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
