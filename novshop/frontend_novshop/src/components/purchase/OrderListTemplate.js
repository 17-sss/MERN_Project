import React from 'react';
import styled, { css } from 'styled-components';
import { getSize } from '../../lib/utility/customFunc';

const OrderListWrapper = styled.div`
    width: ${getSize(1.65)};
    margin: 0 auto;
`;

const OrderListMultiWrapper = styled.div`
    ${(props) =>
        props.stype === 'pagename'
            ? css`
                  width: 100%;
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
            : css``}
`;

const OrderListTemplate = () => {
    return (
        <OrderListWrapper>
            <OrderListMultiWrapper stype="pagename">
                <p>주문 내역</p>
            </OrderListMultiWrapper>

            <OrderListMultiWrapper>


            </OrderListMultiWrapper>
        </OrderListWrapper>
    );
};

export default OrderListTemplate;
