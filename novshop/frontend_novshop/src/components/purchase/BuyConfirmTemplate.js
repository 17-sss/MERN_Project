import React from 'react';
// import styled, { css } from 'styled-components';
import {    
    CommonTableWrapper as BuyConfirmWrapper,
    // SubjectLink,
    // EmptyWrapper,
} from '../common/CommonTableComponents';
import {
    PurchaseMultiWrapper, /* PurchaseTable, PurchaseTh, PurchaseTd, PurchaseIsSaleP, PurchaseBtn */
} from './StylePurchase';

const BuyConfirmTemplate = (props) => {
    return (
        <BuyConfirmWrapper>
            <PurchaseMultiWrapper stype="pagename">
                <p id="pageType">구매 확정</p>
            </PurchaseMultiWrapper>
        </BuyConfirmWrapper>
    )
}

export default BuyConfirmTemplate;