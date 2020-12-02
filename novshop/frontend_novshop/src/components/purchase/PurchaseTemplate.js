// 구매 / 장바구니 Template
import React from 'react';
import styled from 'styled-components';
import {
    CommonTableWrapper,
    CommonTableMultiWrapper,
    StyledTable,
    StyledTh,
    // EmptyWrapper,
} from './common/CommonTableComponents';

// [1] Table 관련
// 1-1) table
const PurchaseTable = styled(StyledTable)`
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
`;

const PurchaseTr = styled.tr`
    background-color: ${props => props.stype === "head" ? "#f0f0f0": "white"};
`;

// 1-3) th
const PurchaseTh = styled(StyledTh)`
    height: 35px;
    border-bottom: 1px solid #e3e3e3;
`;
// ---------------------------------------------------/

const PurchaseTemplate = (props) => {
    const { etcs } = props;
    const { page } = etcs;

    return (
        <CommonTableWrapper>
            <CommonTableMultiWrapper stype="pagename">
                <p id="pageType">
                    {page === 'shoppingcart'
                        ? '장바구니'
                        : page === 'buy'
                        ? '구매'
                        : ''}
                </p>
            </CommonTableMultiWrapper>

            <CommonTableMultiWrapper stype="table">
                <PurchaseTable>
                    <colgroup>
                        {/* colgroup 순서: 이미지, 상품정보(30), 판매가, 수량, 적립금, 배송비, 합계, 선택(주문 or 삭제) */}
                        <col style={{ width: '3%' }} />
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '27%' }} />
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '10%' }} />                        
                    </colgroup>
                    <thead>
                        <PurchaseTr stype={"head"}>
                            <PurchaseTh scope="col">
                                <input type="checkbox" name="selectitem" />
                            </PurchaseTh>
                            <PurchaseTh scope="col">이미지</PurchaseTh>
                            <PurchaseTh scope="col">상품정보</PurchaseTh>
                            <PurchaseTh scope="col">판매가</PurchaseTh>
                            <PurchaseTh scope="col">수량</PurchaseTh>
                            <PurchaseTh scope="col">적립금</PurchaseTh>
                            <PurchaseTh scope="col">배송비</PurchaseTh>
                            <PurchaseTh scope="col">합계</PurchaseTh>
                            <PurchaseTh scope="col">선택</PurchaseTh>
                        </PurchaseTr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Test1</td>
                            <td>Test2</td>
                            <td>Test3</td>
                        </tr>

                        <tr>
                            <td>Tes1</td>
                            <td>Tes2</td>
                            <td>Tes3</td>
                        </tr>
                    </tbody>
                </PurchaseTable>

                {/*                 
                <EmptyWrapper>
                    <span>장바구니가 비어 있습니다.</span>
                </EmptyWrapper>
                */}
            </CommonTableMultiWrapper>
        </CommonTableWrapper>
    );
};

export default PurchaseTemplate;
