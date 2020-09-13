import React from 'react';
import styled, {css} from 'styled-components';
import { getSize } from "../../../lib/utility/customFunc";
import { StyledHr, ClearEx } from "../../common/StyleUtilModels";

// 각종 함수 or 변수 START ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
const calcImageRatio = (AnNum, AstrType) => {      
    const strType = (AstrType !== ("width" && "height") ? "err" : AstrType);
    const nDiv10 = Number(getSize(1.5, strType, false, true)) / 10;
    return (nDiv10 * AnNum) + "px";
};

// 각종 함수 or 변수 END ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■



// 상품 상세 :: [공통] START ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ========================================================================================
// ************* 상품 상세 -  Wrapper *************
// ========================================================================================
const ProductDetailWrapper = styled.div`
    margin: 0 auto;

    ${(props) => {
        const {mode} = props;        
        const caseMode = (mode !== ("detail" && "additional") ? "detail" : mode);
        
        switch (caseMode) {
            case "detail":{
                return css`
                    width: ${getSize(1.5)};
                `;
            }           
            case "additional": {
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


// ========================================================================================
// ************* 상품 상세 - 다용도 wrapper *************
// ========================================================================================
const ProductMultiWrapper = styled.div`
    ${props => {
        const {mode, height, width} = props;        
        const caseMode = (mode !== ("detail" && "additional") ? "detail" : mode);        
    
        switch (caseMode) {        
            case "detail": {
                return css`
                    height: ${() => height || calcImageRatio(5, "width")};
                    width: ${() => width || "50%"};    
                    display: inline-block;                                              
                `;
            }
            case "additional": {
                return css`
                `;
            }        
            default:    
                break;
        }
    }}
`;
// ---------------------------------------------------/
// 상품 상세 :: [공통] END ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒


const ProductDetailView = (props) => {
    const {itemImage, itemName} = props;
    console.log(props);

    return (
        <>
            {/* 상품 상세 :: 구매, 이미지, 가격 등 */}
            <ProductDetailWrapper>
                <ProductMultiWrapper>
                    <img                                            
                        src={itemImage}
                        alt={itemName}
                        width="100%"
                        height={"auto"}
                        style={{
                            margin: "10px",                        
                        }}
                    />
                </ProductMultiWrapper>
                
                <ProductMultiWrapper>
                    123
                </ProductMultiWrapper>
            </ProductDetailWrapper>

            <ClearEx />
            <StyledHr/>

            {/* 상품 상세 :: 추가정보(제품 상세정보) */}
            <ProductDetailWrapper mode = {"additional"}>
                Test2
            </ProductDetailWrapper>
        </>
    );
};

export default ProductDetailView;