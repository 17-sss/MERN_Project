import React from 'react';
import styled from 'styled-components';
import { getSize } from '../../lib/utility/customFunc';
import { PurchaseMultiWrapper as OrderListMultiWrapper } from './StylePurchase';

const OrderListWrapper = styled.div`
    width: ${getSize(1.45)};
    margin: 0 auto;
`;

const OrderListTemplate = () => {
    return (
        <OrderListWrapper>
            <OrderListMultiWrapper
                stype="pagename"
                style={{ margin: '50px 0 20px' }}
            >
                <p id="pageType">주문 내역</p>
            </OrderListMultiWrapper>
            {/* <OrderListMultiWrapper
                style={{ height: '200px', backgroundColor: 'green' }}
            >
                불러오세요~ 주문내역
            </OrderListMultiWrapper> */}
        </OrderListWrapper>
    );
};

export default OrderListTemplate;
