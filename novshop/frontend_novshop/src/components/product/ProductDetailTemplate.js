import React from 'react';
import styled, { css } from 'styled-components';
import { getSize } from '../../lib/utility/customFunc';
import { StyledHr, ClearEx } from '../common/StyleUtilModels';

import productDataList from '../../lib/data/productList.json';

// 각종 함수 or 변수 START ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
const calcImageRatio = (AnNum, AstrType) => {
    const strType = AstrType !== ('width' && 'height') ? 'err' : AstrType;
    const nDiv10 = Number(getSize(1.5, strType, false, true)) / 10;
    return nDiv10 * AnNum + 'px';
};

// 각종 함수 or 변수 END ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// ========================================================================================
// [1] 상품 공통
// ========================================================================================
// 상품 상세 -  Wrapper
const ProductDetailWrapper = styled.div`
    margin: 0 auto;

    ${(props) => {
        const { mode } = props;
        const caseMode = mode !== ('detail' && 'additional') ? 'detail' : mode;

        switch (caseMode) {
            case 'detail': {
                return css`
                    width: ${getSize(1.5)};
                `;
            }
            case 'additional': {
                return css`
                    width: ${getSize(1.4)};
                `;
            }

            default:
                break;
        }
    }}
`;
// ---------------------------------------------------/

// 상품 상세 - 다용도 wrapper
const ProductMultiWrapper = styled.div`
    ${(props) => {
        const { mode, height, width } = props;
        const caseMode = mode !== ('detail' && 'additional') ? 'detail' : mode;

        switch (caseMode) {
            case 'detail': {
                return css`
                    height: ${() => height || calcImageRatio(5, 'width')};
                    width: ${() => width || '50%'};
                    display: inline-block;
                    float: left;
                `;
            }
            case 'additional': {
                return css``;
            }
            default:
                break;
        }
    }}
`;
// ---------------------------------------------------/

// 상품 상세 - DetailWrapper간의 여백
const PaddingTB20 = styled.div`
    width: 100%;
    padding: 20px 0;
`;
// ---------------------------------------------------/

// ========================================================================================
// [2] 상품 이미지
// ========================================================================================
// 상품 이미지 - Wrapper
const ProductImageWrapper = styled.div`
    height: 90%;
    overflow: hidden;    
                                
    /* align-items: center;
    justify-content: center;      
    text-align: center; */
       
    img {
        max-height: 100%;
        max-width: 100%;
        height: 100%;
        width: auto;
    }
`;
// ---------------------------------------------------/

// ========================================================================================
// [3] 상품 색상 정보
// ========================================================================================
// 상품 색상 정보 - 사각형 Wrapper
const ProductSquareColorWrapper = styled.div`
    width: 100%;
    height: 20px;
    margin: 10px 0;
`;
// ---------------------------------------------------/

// 상품 색상 정보 - 사각형 Item
const ProductSquareColor = styled.span`
    width: 16px;
    height: 16px;
    margin-right: 2px;
    float: left;
    box-sizing: border-box;
    border: 1px solid #e3e3e5;
    font-size: 0;
    line-height: 0;

    background-color: ${(props) => (props.color ? props.color : 'black')};
`;
// ---------------------------------------------------/

// ========================================================================================
// [4] 상품 일반 정보
// ========================================================================================
// 상품 일반 정보 - Wrapper
const ProductInfo = styled.div`
    position: relative;
    padding: 0px 0 5px 0;
    text-align: left;
    border-bottom: 1px solid #e6e6e6;

    p.it_name {
        font-weight: bold;
        font-size: 14px;

        span.it_size {
            font-size: 12px;
            color: #ababab;
            margin-left: 4px;
            font-weight: normal;
        }
    }

    p.it_desc {
        padding: 5px 0;
        color: #ababab;
        font-size: 13px;
    }
`;
// ---------------------------------------------------/

const ProductDetailView = (props) => {
    // 추후 container 단 START ----------
    const { itemId } = props.query;

    const productData = productDataList.find((item) => { // 추후에 백앤드로 findOne 하기.
        return item.itemId === Number(itemId);
    });

    const {
        itemName,
        itemImage,
        itemSize,
        itemColors,
        // eslint-disable-next-line
        price,
        // eslint-disable-next-line
        sale,
        description,
    } = productData;

    // 추후 container 단 END -------

    return (
        <>
            <PaddingTB20 />
            {/* 상품 상세 :: 구매, 이미지, 가격 등 */}
            <ProductDetailWrapper>
                <ProductMultiWrapper>
                    <ProductImageWrapper>
                        <img src={itemImage} alt={itemName} />
                    </ProductImageWrapper>
                    
                    <ProductSquareColorWrapper>
                        {itemColors.map((v, i) => {
                            return <ProductSquareColor key={i} color={v} />;
                        })}
                    </ProductSquareColorWrapper>

               
                </ProductMultiWrapper>
                <ProductMultiWrapper>
                    <ProductInfo>
                        <p className="it_name">
                            {itemName}
                            <span className="it_size">
                                {'[' + itemSize.join(', ') + ']'}
                            </span>
                        </p>
                        <p className="it_desc">{description}</p>
                    </ProductInfo>
                </ProductMultiWrapper>

                <ClearEx />
                <PaddingTB20 />
            </ProductDetailWrapper>

            <StyledHr />

            {/* 상품 상세 :: 추가정보(제품 상세정보) */}
            <ProductDetailWrapper mode={'additional'}>
                Test2
            </ProductDetailWrapper>
        </>
    );
};

export default ProductDetailView;
