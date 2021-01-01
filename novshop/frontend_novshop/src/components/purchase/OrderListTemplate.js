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

                  ${OrderListCell} {
                      padding: 5px 0;
                      margin: 0 0.5%;
                      text-align: center;
                      font-weight: bold;
                      font-size: 15px;
                  }
              `
            : props.stype === 'dataRow' &&
              css`
                  height: 30px;

                  ${OrderListCell} {
                      padding: 5px 0;
                      margin: 0 5px;
                      text-align: ${props.align ? props.align : 'center'};
                      font-size: 13px;
                  }
              `}
`;

const OrderListCell = styled.span`
    display: inline-block;
    width: ${(props) => (props.width ? props.width : '10%')};
    vertical-align: center;
`;
// =====

const OrderListTemplate = (props) => {
    const { etc } = props;
    const { headDatas } = etc;

    return (
        <OrderListWrapper>
            <OrderListMultiWrapper stype="pagename">
                <p>주문 내역</p>
            </OrderListMultiWrapper>

            <OrderListMultiWrapper stype="tableDiv">
                <OrderListMultiWrapper stype="headRow">
                    {headDatas &&
                        headDatas.map((v) => (
                            <OrderListCell width={v.width}>
                                {v.name}
                            </OrderListCell>
                        ))}
                </OrderListMultiWrapper>

                <OrderListMultiWrapper stype="dataRow">
                    <OrderListCell width="12%">20201231</OrderListCell>
                    <OrderListCell width="16%">image</OrderListCell>
                    <OrderListCell width="41%">info</OrderListCell>
                    <OrderListCell width="12%">1</OrderListCell>
                    <OrderListCell width="13%">20000</OrderListCell>
                </OrderListMultiWrapper>

                <OrderListMultiWrapper stype="dataRow">
                    <OrderListCell width="12%">20201231</OrderListCell>
                    <OrderListCell width="16%">image</OrderListCell>
                    <OrderListCell width="41%">info</OrderListCell>
                    <OrderListCell width="12%">1</OrderListCell>
                    <OrderListCell width="13%">20000</OrderListCell>
                </OrderListMultiWrapper>
            </OrderListMultiWrapper>
        </OrderListWrapper>
    );
};

export default OrderListTemplate;
