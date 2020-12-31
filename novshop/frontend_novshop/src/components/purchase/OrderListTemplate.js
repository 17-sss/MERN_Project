import React from 'react';
import styled, { css } from 'styled-components';
import { getSize } from '../../lib/utility/customFunc';

const OrderListWrapper = styled.div`
    width: ${getSize(1.65)};
    margin: 0 auto;
`;

const OrderListMultiWrapper = styled.div`
    width: 100%;

    ${(props) =>
        props.stype === 'pagename'
            ? css`
                  min-height: 30px;
                  margin: 50px 0 20px;
                  border-bottom: 0;
                  text-align: center;

                  p {
                      font-weight: 100;
                      color: #222;
                      font-size: 20px;
                  }
              `
            : props.stype === 'tableDiv'
            ? css`
                  border-top: 1px solid #e3e3e3;
                  border-bottom: 1px solid #e3e3e3;
                  margin: 20px auto;
              `
            : props.stype === 'headRow'
            ? css`
                  height: 30px;
                  background-color: #fbfafa;
              `
            : props.stype === 'dataRow' &&
              css`
                  height: 30px;
              `}
`;

const OrderListCell = styled.span`
    display: inline-block;
    width: ${(props) => (props.width ? props.width : '10%')};
    vertical-align: center;

    ${(props) =>
        props.stype === 'head'
            ? css`
                  padding: 5px 0;
                  margin: 0 0.5%;
                  text-align: center;
                  font-weight: bold;
                  font-size: 15px;
              `
            : props.stype === 'data' &&
              css`
                  padding: 5px 0;
                  margin: 0 5px;
                  text-align: ${props.align ? props.align : 'center'};
                  font-size: 13px;
              `}
`;

const OrderListTemplate = () => {
    return (
        <OrderListWrapper>
            <OrderListMultiWrapper stype="pagename">
                <p>주문 내역</p>
            </OrderListMultiWrapper>

            <OrderListMultiWrapper stype="tableDiv">

                <OrderListMultiWrapper stype="headRow">
                    <OrderListCell stype="head" width="12%">
                        주문일자
                    </OrderListCell>
                    <OrderListCell stype="head" width="16%">
                        이미지
                    </OrderListCell>
                    <OrderListCell stype="head" width="41%">
                        상품정보
                    </OrderListCell>
                    <OrderListCell stype="head" width="12%">
                        수량
                    </OrderListCell>
                    <OrderListCell stype="head" width="13%">
                        상품구매금액
                    </OrderListCell>
                </OrderListMultiWrapper>

                <OrderListMultiWrapper stype="dataRow">
                    <OrderListCell stype="data" width="12%">
                        20201231
                    </OrderListCell>
                    <OrderListCell stype="data" width="16%">
                        image
                    </OrderListCell>
                    <OrderListCell stype="data" width="41%">
                        info
                    </OrderListCell>
                    <OrderListCell stype="data" width="12%">
                        1
                    </OrderListCell>
                    <OrderListCell stype="data" width="13%">
                        20000
                    </OrderListCell>
                </OrderListMultiWrapper>

                <OrderListMultiWrapper stype="dataRow">
                    <OrderListCell stype="data" width="12%">
                        20201231
                    </OrderListCell>
                    <OrderListCell stype="data" width="16%">
                        image
                    </OrderListCell>
                    <OrderListCell stype="data" width="41%">
                        info
                    </OrderListCell>
                    <OrderListCell stype="data" width="12%">
                        1
                    </OrderListCell>
                    <OrderListCell stype="data" width="13%">
                        20000
                    </OrderListCell>
                </OrderListMultiWrapper>
                
            </OrderListMultiWrapper>
        </OrderListWrapper>
    );
};

export default OrderListTemplate;
