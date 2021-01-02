import React from 'react';
import styled, { css } from 'styled-components';
import { SubjectLink } from '../common/CommonTableComponents';
import { TransparentBtn } from '../common/StyleUtilModels'
import { getSize, threeDigitsComma } from '../../lib/utility/customFunc';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';       // fas

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
                  border-bottom: 1px solid #e3e3e3;

                  ${OrderListCell} {
                      padding: 5px 0;
                      margin: 0 0.5%;
                      font-weight: bold;
                      font-size: 15px;
                  }
              `
            : props.stype === 'dataRow' &&
              css`
                  border-bottom: 1px solid #f3f3f3;

                  ${OrderListCell} {
                      padding: 5px 0;
                      margin: 0 5px;
                      font-size: 13px;
                  }
              `}
`;

const OrderListCell = styled.span`
    display: inline-block;
    width: ${(props) => (props.width ? props.width : '10%')};
    text-align: ${(props) => (props.align ? props.align : 'center')};
    vertical-align: middle;
`;

const OrderListProdInfo = styled.div`
    display: inline-block;
    ${(props) =>
        props.stype === 'info'
            ? css`                  
                  width: 80%;
                  vertical-align: middle;
              `
            : props.stype === 'detail' &&
              css`                                    
                  width: 20%;
                  vertical-align: bottom;
                  text-align: center;
              `};
`;

const OrderListDetailBtn = styled(TransparentBtn)`
    color: #bdbdbd;
    font-weight: bold;    
    &:hover {
        color: #d6d6d6;
    }
`;

// =====

const OrderListTemplate = (props) => {
    const { orderItems, etc } = props;
    const { headDatas } = etc;

    return (
        <OrderListWrapper>
            <OrderListMultiWrapper stype="pagename">
                <p>주문 내역</p>
            </OrderListMultiWrapper>

            <OrderListMultiWrapper stype="tableDiv">
                <OrderListMultiWrapper stype="headRow">
                    {headDatas &&
                        headDatas.map((v, i) => (
                            <OrderListCell width={v.width} key={i}>
                                {v.name}
                            </OrderListCell>
                        ))}
                </OrderListMultiWrapper>

                {orderItems &&
                    orderItems.map((v, i) => {
                        // 여기선 하나의 주문 데이터의 최상위 값만 가져옴. (주문했을 시, 주문한 아이템을 전부 한행에 가져오면 더러워질 듯)
                        const firstItem = v.items[0];

                        // 링크
                        const { categoryId, categorySub } = firstItem.product;

                        let aLink = '/shopping';
                        if (!categoryId && !categorySub) {
                            aLink = aLink + `?itemId=${firstItem.productId}`;
                        } else if (categoryId && !categorySub) {
                            aLink =
                                aLink +
                                `?main=${categoryId}&itemId=${firstItem.productId}`;
                        } else if (categoryId && categorySub) {
                            aLink =
                                aLink +
                                `?main=${categoryId}&sub=${categorySub}&itemId=${firstItem.productId}`;
                        }

                        const fixSizes =
                            '[' +
                            JSON.parse(firstItem.product.sizes).join(', ') +
                            ']';

                        return (
                            <OrderListMultiWrapper stype="dataRow" key={i}>
                                <OrderListCell width={headDatas[0].width}>
                                    {v.createdAt}
                                </OrderListCell>
                                <OrderListCell width={headDatas[1].width}>
                                    <img
                                        style={{
                                            maxWidth: '120px',
                                        }}
                                        alt={firstItem.product.name}
                                        src={
                                            '/uploads/' +
                                            firstItem.product.image
                                        }
                                    />
                                </OrderListCell>
                                <OrderListCell
                                    width={headDatas[2].width}
                                    align="left"
                                >                        
                                    <OrderListProdInfo stype="info">
                                        <ul>
                                            <li>
                                                <SubjectLink
                                                    to={aLink}
                                                    style={{
                                                        margin: '0',
                                                        padding: '0',
                                                    }}
                                                >
                                                    {firstItem.product.name}
                                                </SubjectLink>
                                            </li>
                                            <li>
                                                <b>{fixSizes}</b>
                                            </li>
                                            <li>
                                                <span className="lightgray">
                                                    [옵션: {firstItem.selcolor}{' '}
                                                    / {firstItem.selsize}]
                                                </span>
                                            </li>
                                        </ul>
                                    </OrderListProdInfo>
                                    
                                    <OrderListProdInfo stype="detail">
                                        <OrderListDetailBtn type="button">
                                            주문 상세정보&nbsp;
                                            <FontAwesomeIcon size="lg" icon={faCaretDown}/>
                                        </OrderListDetailBtn>
                                    </OrderListProdInfo>                                                                 
                                </OrderListCell>

                                <OrderListCell
                                    width={headDatas[3].width}
                                    style={{ marginLeft: '10px' }}
                                >
                                    {threeDigitsComma(v.totalPrice) + '원'}
                                </OrderListCell>
                            </OrderListMultiWrapper>
                        );
                    })}
            </OrderListMultiWrapper>
        </OrderListWrapper>
    );
};

export default OrderListTemplate;
