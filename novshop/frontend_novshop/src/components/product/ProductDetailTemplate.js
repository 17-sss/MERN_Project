import React from 'react';
import styled, { css } from 'styled-components';
import CustomTable from "../../components/table/CustomTable";
import { getSize, calcImageRatio } from '../../lib/utility/customFunc';
import { ClearEx, BorderBotLine } from '../common/StyleUtilModels';
import { cssStrike, cssTransparent } from '../common/StyleUtilCSS';
import { Container, Row, Col, Navbar, Nav, NavLink } from 'react-bootstrap';

// {0} 공통 ***************************************************************************************************************************
// ========================================================================================
// [1] 공통
// ========================================================================================
// 1) 상품 - 전체 Wrapper ('buy' or 'detail')
const PdDetailWrapper = styled.div`
    margin: 0 auto;
    
    ${(props) => {
        const { mode } = props;
        const caseMode = mode !== 'detail' ? 'buy' : mode;

        switch (caseMode) {
            case 'buy': {
                return css`
                    /* width: ${getSize(1.95)}; */
                    width: ${getSize(1.7)};
                `;
            }
            case 'detail': {
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

// 2) 상품 상세 - 다용도 wrapper
const ProductMultiWrapper = styled.div`
    padding: ${(props) => props.padding || '0 30px'};
    ${(props) => {
        const { mode, height, width, margin } = props;
        const caseMode = mode !== ('buy' && 'detail') ? 'buy' : mode;

        switch (caseMode) {
            case 'buy': {
                return css`
                    height: ${ height || calcImageRatio(5, 'width')};                    
                    display: inline-block;
                    float: left;
                    width: ${width || '50%'};
                    margin: ${margin && margin};
                `;
            }
            case 'detail': {
                return css``;
            }
            default:
                break;
        }
    }}
`;
// ---------------------------------------------------/

// ========================================================================================
// [2] 기타 (padding, hr 등)
// ========================================================================================
// 1) padding top, bottom 20 여백
const PaddingTB20 = styled.div`
    width: 100%;
    padding: 20px 0;
`;
// ---------------------------------------------------/

// 2) pdDetailWrapper 간의 구분선 ("detail" or "detail")
const StyledHr = styled.hr`
    width: ${getSize(1)};
    margin: 0 auto;
`;
// ---------------------------------------------------/




// {1} 상품 상세 Wraaper 관련 ***************************************************************************************************************************

// ========================================================================================
// [1] 상품 이미지
// ========================================================================================
// 1) 상품 이미지 - Wrapper
const ProductImageWrapper = styled.div`
    /* height: 90%; */
    overflow: hidden;

    /* align-items: center;
    justify-content: center;      
    text-align: center; */

    img {
        max-height: 100%;
        max-width: 100%;
        ${(props) => {
            const { imgClientSize, mode } = props;
            if (!imgClientSize)
                return css`
                    width: 100%;
                `;

            const { width, height } = imgClientSize;
            if (width <= 0 || height <= 0)
                return css`
                    width: 100%;
                `;

            // 구조상 mode = height는 쓸필요 없으나 그냥 만듬
            switch (mode) {
                case 'width':
                    return css`
                        width: ${width + 'px'};
                        height: auto;
                    `;
                case 'height':
                    return css`
                        width: auto;
                        height: ${height + 'px'};
                    `;
                default:
                    return css`
                        width: 100%;
                    `;
            }
        }}
    }
`;
// ---------------------------------------------------/

// ========================================================================================
// [2] 상품 색상 정보
// ========================================================================================
// 1) 상품 색상 정보 - 사각형 Wrapper
const ProductSquareColorWrapper = styled.div`
    width: 100%;
    height: 20px;
    margin: 10px 0;
`;
// ---------------------------------------------------/

// 2) 상품 색상 정보 - 사각형 Item
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
// [3] 상품 일반 정보
// ========================================================================================
// 1) 상품 일반 정보 - 상품명, 부가설명, 상품가, 마일리지 Wrapper
const ProductInfoWrapper = styled.div`
    position: relative;
    text-align: left;

    /* 상품명 */
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

    /* 상품 가격 & 마일리지 */
    p.it_price,
    p.it_mileage {
        /*  Wrapper (p 태그) */
        padding: 8px 0;
        overflow: hidden;
    }

    span.price_caption,
    span.mile_caption {
        /* caption */
        font-size: 12px;
        font-family: 'Martel Sans', 'Nanum Gothic';
        width: 85px;
        display: inline-block;
    }

    /* 부가설명 */
    p.it_desc {
        padding: 5px 0 12px 0;
        color: #ababab;
        font-size: 13px;
    }

    /* 구매 관련 설명 */
    p.buy_ea {
        font-size: 12px;
        color: #ababab;
    }
    p.buy_desc {
        padding-top: 5px;
        font-size: 12px;
        color: red;
    }
`;

// 1.1) 상품 가격 & 마일리지 표시용
const ProductPriceViewSpan = styled.span`
    ${(props) => {
        const { sale } = props;
        return css`
            font-size: 12px;
            display: inline-block;
            ${sale &&
            css`
                ${cssStrike}
                margin-right: 8px;
            `}
        `;
    }}
`;
// ---------------------------------------------------/

// 2.1) 상품 일반 정보 - SelectBOX
const ProductInfoSelectBox = styled.select`
    width: 250px;
`;

// 2.2) 상품 일반 정보 - 색상, 사이즈 정보 & SelectBOX (종류: p Tag, ProductInfoSelectBox 포함하여 래핑.)
const ProductInfoSelectP = styled.p`
    padding: 8px 0;
    overflow: hidden;

    span.select_caption {
        font-size: 12px;
        font-family: 'Martel Sans', 'Nanum Gothic';
        width: 85px;
        display: inline-block;
    }

    ${ProductInfoSelectBox} {
        display: inline-block;
    }
`;
// ---------------------------------------------------/

// ========================================================================================
// [4] 선택한 상품 옵션 View (with Bootstrap)
// ========================================================================================
const ProductSelOptCol = styled(Col)`
    padding: 0;
    font-size: 12px;

    ${(props) => {
        let { align, lineheight, padding } = props;
        if (!align) align = 'left';
        return css`
            align-items: ${align};
            justify-content: ${align};
            text-align: ${align};
            ${lineheight &&
            css`
                line-height: ${lineheight};
            `};
            ${padding &&
            css`
                padding: ${padding};
            `}
        `;
    }};

    div#volume_wrap {
        position: relative;
        top: 18px;

        input[type='number']::-webkit-inner-spin-button,
        input[type='number']::-webkit-outer-spin-button {
            //-webkit-appearance: "Always Show Up/Down Arrows";
            opacity: 1;
        }
    }

    div#sel_price_wrap {
        position: relative;
        top: 10px;
    }

    p#sizeinfo {
        font-weight: bold;
    }

    p#colorsize{
        color: #6c6565;
    }
`;
// ---------------------------------------------------/

// ========================================================================================
// [5] 버튼 (구매, 장바구니)
// ========================================================================================
const ProductInputBtns = styled.input`
    margin-top: 10px;

    ${cssTransparent};

    ${(props) => {
        const { mode } = props;
        switch (mode) {
            case 'buy': {
                return css`
                    width: 100%;
                    height: 50px;
                    background-color: #1c4fe9;
                    color: white;
                    &:hover {
                        background-color: #3759be;
                        color: white;
                    }
                `;
            }
            default:
                break;
        }
    }}
`;
// ---------------------------------------------------/




// {2} 상품 추가정보 Wraaper 관련 ***************************************************************************************************************************

// ========================================================================================
// [1] 추가 정보 관련 버튼 (현 페이지 내 이동 관련)
// ========================================================================================
// 1.1) 추가정보용 버튼 Wrapper (with Bootstrap)
const ProductAddInfoBtnsWrapper = styled(Navbar)`
    width: ${getSize(1.7)};
    margin: 0 auto;

    align-items: center;
    justify-content: center;
    text-align: center;
`;

// 1.2) Nav (with bootstrap)
const StyledNav = styled(Nav)`
    margin: 0 auto;
`;

// 1.3) 추가정보용 버튼 
const ProductAddInfoLink = styled(NavLink)`
    ${cssTransparent};
    margin: 0 2.5rem;
    width: 100px;
    height: 20px;        
    box-shadow: 0 0.3px 0 0;

    &:hover{        
        box-shadow: 0 0.5px 0 0;
    }
`;
// ---------------------------------------------------/

// ========================================================================================
// [2] 추가 정보 - 분류를 구분하는 큰 글자 
// ========================================================================================
const ProductAddInfoBigName = styled.div`
    position: relative;
    display: inline-block;
    width: 100%;
    margin: ${(props) =>
        props.children === 'REVIEW'
            ? '60px auto 40px'
            : '40px auto 40px'};
    font-size: 24px;
    height: 44px;
    line-height: 44px;
    font-weight: 100;
    text-align: center;
    opacity: 0.9;
`;
// // ---------------------------------------------------/

// ========================================================================================
// [3] INFO 전용 DIV
// ========================================================================================
const ProductAddInfoTextWrapper = styled.div`
    width: ${getSize(2)};
    margin: 0 auto;    
    padding-left: 6rem;

    h6{
        font-weight: bold;
    }
`;

// ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●● ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●● 

const ProductDetailTemplate = (props) => {
    const { productData, productSelectItems, refs, events, imgDivInfo, reviewStatus, qaStatus } = props;

    const {
        // categoryId,
        // categorySub,
        name,
        colors,
        sizes,
        description,
        image,
        price,
        sale,
    } = productData;

    const {colorRef, sizeRef} = refs;
    const { onOptionConfirmation, onVolumeChange, onOptionDelete, onAddReviewTest, onAddQATest } = events;    
    const { imgRef, imgClientSize } = imgDivInfo;

    return (
        <>            
            <PaddingTB20 />
            {/* 상품 상세 :: 구매, 이미지, 가격 등 ====================================================================================================== [## 1] */}
            <PdDetailWrapper>
                {/* 상품 이미지, 색상정보(사각형) */}
                <ProductMultiWrapper height="auto">
                    {/* 추후에 이미지 사이즈에 따라 조정하기 */}
                    <ProductImageWrapper
                        ref={imgRef}
                        imgClientSize={imgClientSize && imgClientSize}
                        mode={'width'}
                    >
                        <img src={image} alt={name} />
                    </ProductImageWrapper>
                    <ProductSquareColorWrapper>
                        {colors &&
                            colors.map((v, i) => {
                                return (
                                    <ProductSquareColor key={i} color={v.key} />
                                );
                            })}
                    </ProductSquareColorWrapper>
                </ProductMultiWrapper>

                {/* 상품의 전반적인 정보 및 구매 & 장바구니 */}
                <ProductMultiWrapper height={"auto"}>
                    {/* 추후에 이미지 사이즈에 따라 조정하기 */}
                    <ProductInfoWrapper>
                        {/* 상품명, 사이즈정보, 부가설명 */}
                        <p className="it_name">
                            {name}
                            <span className="it_size">
                                {sizes && '[' + sizes.join(', ') + ']'}
                            </span>
                        </p>
                        <p className="it_desc">{description}</p>

                        <BorderBotLine
                            margin="12px 0"
                            width="100%"
                            color="#e6e6e6"
                        />

                        {/* 가격, 마일리지 */}
                        <p className="it_price">
                            <span className="price_caption">Price</span>
                            <ProductPriceViewSpan sale={sale}>
                                {price}원
                            </ProductPriceViewSpan>
                            {sale > 0 && (
                                <ProductPriceViewSpan>
                                    <b>{price - (price * sale)}원</b>
                                </ProductPriceViewSpan>
                            )}
                        </p>
                        <p className="it_mileage">
                            <span className="mile_caption">Mileage</span>
                            <ProductPriceViewSpan>
                                {sale > 0
                                    ? Math.floor((price - (price * sale)) * 0.01)
                                    : Math.floor(price * 0.01)}
                                원
                            </ProductPriceViewSpan>
                        </p>

                        <BorderBotLine
                            margin="12px 0"
                            width="100%"
                            color="#e6e6e6"
                        />

                        {/* 색상 선택 */}
                        <ProductInfoSelectP>
                            <span className="select_caption">Color</span>
                            <ProductInfoSelectBox
                                defaultValue={'- [필수] 옵션을 선택해 주세요 -'}
                                onChange={onOptionConfirmation}
                                name="color_select"
                                ref={colorRef}
                            >
                                <option>- [필수] 옵션을 선택해 주세요 -</option>
                                {colors &&
                                    colors.map((v, i) => {
                                        return (
                                            <option key={i}>{v.value}</option>
                                        );
                                    })}
                            </ProductInfoSelectBox>
                        </ProductInfoSelectP>

                        <BorderBotLine
                            margin="12px 0"
                            width="100%"
                            color="#e6e6e6"
                        />

                        {/* 사이즈 선택 */}
                        <ProductInfoSelectP>
                            <span className="select_caption">Size</span>
                            <ProductInfoSelectBox
                                defaultValue={'- [필수] 옵션을 선택해 주세요 -'}
                                onChange={onOptionConfirmation}
                                name="size_select"
                                ref={sizeRef}
                            >
                                <option>- [필수] 옵션을 선택해 주세요 -</option>
                                {sizes &&
                                    sizes.map((v, i) => {
                                        return <option key={i}>{v}</option>;
                                    })}
                            </ProductInfoSelectBox>
                        </ProductInfoSelectP>

                        <BorderBotLine
                            margin="12px 0"
                            width="100%"
                            color="#e6e6e6"
                        />

                        {/* 구매관련 설명 */}
                        <div>
                            <p className="buy_ea">(최소주문수량 1개 이상)</p>
                            <p className="buy_desc">
                                위 옵션선택 박스를 선택하시면 아래에 상품이
                                추가됩니다.
                            </p>
                        </div>
                        <BorderBotLine
                            margin="12px 0"
                            width="100%"
                            color="#e6e6e6"
                        />

                        {/* Select 박스에서 선택한 옵션 View (조건부 visible) */}
                        {productSelectItems &&
                            productSelectItems.items.length > 0 &&
                            productSelectItems.items.map((v) => {
                                return (
                                    <Container key={v.id}>
                                        <Row>
                                            <ProductSelOptCol>
                                                <p>{v.name}</p>
                                                {sizes && (
                                                    <p id="sizeinfo">
                                                        {'[' + v.sizeinfo + ']'}
                                                    </p>
                                                )}
                                                <p id="colorsize">
                                                    - {v.color + '/' + v.size}
                                                </p>
                                            </ProductSelOptCol>
                                            <ProductSelOptCol align="right">
                                                <div id="volume_wrap">
                                                    <span>수량: </span>
                                                    <input
                                                        id={v.id}
                                                        type="number"
                                                        name="volume"
                                                        value={v.volume}
                                                        min="1"
                                                        max="20"                                                        
                                                        onChange={onVolumeChange}
                                                    />                                                                  
                                                    <input
                                                        id={v.id}
                                                        type="button"
                                                        value={'X'}
                                                        name="delThis"
                                                        onClick={onOptionDelete}

                                                        style={{
                                                            marginLeft: '4px',
                                                            width: '20px',
                                                            height: 'auto',
                                                        }}
                                                    />
                                                </div>
                                            </ProductSelOptCol>
                                            <ProductSelOptCol align="right">
                                                <div id="sel_price_wrap">
                                                    <p>{v.price}원</p>
                                                    <p>
                                                        적: &nbsp;{v.mileage}원
                                                    </p>
                                                </div>
                                            </ProductSelOptCol>
                                        </Row>
                                    </Container>
                                );
                            })
                        }                            

                        {/* 총상품금액(수량) */}
                        {productSelectItems &&
                            productSelectItems.items.length > 0 && (
                                <>
                                    <BorderBotLine
                                        margin="12px 0"
                                        width="100%"
                                        color="#e6e6e6"
                                    />
                                    <div>
                                        <p>총 상품금액(수량) : {productSelectItems.totalprice}원</p>
                                    </div>
                                </>
                            )}
                        {/* 구매 & 장바구니추가 btn */}
                        <ProductInputBtns
                            mode="buy"
                            type="button"
                            value={'BUY NOW'}
                        />
                    </ProductInfoWrapper>
                </ProductMultiWrapper>

                <ClearEx />                
            </PdDetailWrapper>

            <PaddingTB20 />
            <StyledHr />
            <PaddingTB20 />
                                

            {/* 상품 상세 :: 추가정보(제품 상세정보) ====================================================================================================== [## 2] */}
            <PdDetailWrapper mode={'detail'}>

                <ProductAddInfoBtnsWrapper>
                    <StyledNav>
                        <ProductAddInfoLink href="#review">REVIEW</ProductAddInfoLink>
                        <ProductAddInfoLink href="#detail">DETAIL</ProductAddInfoLink>
                        <ProductAddInfoLink href="#sizeinfo">SIZE INFO</ProductAddInfoLink>
                        {/* <ProductAddInfoLink href="#codi">CODI ITEM</ProductAddInfoLink> */}
                        <ProductAddInfoLink href="#qa">{"Q & A"}</ProductAddInfoLink>
                        <ProductAddInfoLink href="#info">INFO</ProductAddInfoLink>
                    </StyledNav>
                </ProductAddInfoBtnsWrapper>

                <ProductAddInfoBigName id="review">REVIEW</ProductAddInfoBigName>
                <CustomTable type="review" subjects={["번호", "사진", "제목", "작성자", "평점"]} data={reviewStatus && reviewStatus.data} />
                    
                <ProductAddInfoBigName id="detail">DETAIL</ProductAddInfoBigName>

                <ProductAddInfoBigName id="sizeinfo">SIZE INFO</ProductAddInfoBigName>

                {/* <ProductAddInfoBigName>CODI ITEM</ProductAddInfoBigName> */}
                {/* 코디: 비활성 */}

                <ProductAddInfoBigName id="qa">{"Q & A"}</ProductAddInfoBigName>
                <CustomTable type="qa" subjects={["번호", "제목", "작성자", "날짜", "조회"]} data={qaStatus && qaStatus.data}/>

                <ProductAddInfoBigName id="info">INFO</ProductAddInfoBigName>
                <ProductAddInfoTextWrapper>                
                    <h6>배송정보</h6>
                    <br />
                    <p>
                        nov Shop은 CJ대한통운(1588-1255)를 이용하여 상품을 발송해 드립니다.<br />
                        회원가입시 전지역 기본 배송비는 무료, 비회원 구매시 기본 2,500원 이며,
                        5만원 이상 구매시 배송비를 지원해 드립니다.<br />
                        고객님께서 주문하신 상품은 2일에서 7일정도 기간이 소요되며, 간혹
                        특정상품의 주문 폭주로 인해 배송이 다소 지연될 수 있습니다.<br />
                        사이트 상단의 order(주문조회)메뉴를 클릭한 후, 조회하고자 하는
                        주문상품명의 배송현황을 조회하면 현황을 확인 하 실 수있습니다.<br />
                        또한 사이트 상단 배너를 통해서도 order(주문조회) 페이지에 접속하실 수
                        있습니다.<br />
                    </p>
                    <br /><br />

                    <h6>교환/반품정보</h6>
                    <br />
                    <p>
                        상품 수령 후 7일 이내에 noveShop에 상품이 도착한 경우만 교환/반품이
                        가능합니다.<br />
                        고객센터 : 1599-2785 (AM 10:00-PM5:00) / 점심시간 12:30-1:30<br /><br />

                        오배송 및 상품 불량일 경우 동일 상품으로만 교환 가능하며, noveShop에서
                        왕복 배송료를 부담해 드립니다.<br />
                        그 외 사이즈 및 색상 교환 시 구매자께서 왕복 배송비 5,000원을 부담해
                        주셔야 하며,<br />
                        불량 상품으로 인한 전체 반품 시에는 구매자께서 편도 배송비 2,500원을
                        동봉해 주셔야 합니다.<br />
                        반품시에는 CJ대한통운(1588-1255)을 이용하여 반품주소에 착불로 적어
                        보내주셔야 교환이 가능합니다.<br />
                        (다른 택배업체를 이용하실 경우 구매자께서 선지불)<br /><br />

                        교환/반품주소 : 서울특별시 강남구 역삼동 CJ대한통운 D터미널 직영 양태영
                        담당자 (꼭 "CJ대한통운" 으로 접수부탁드립니다)<br /><br /><br />
                    </p>

                    
                    <h6>환불안내</h6>
                    <br />
                    <p>
                        상품출고 전 환불요청시 처리는 1-3일(평일 기준)정도 소요되며, 배송이
                        진행중이거나 완료된 후에는 상품 도착 후 4-5일(평일기준) 이내에 처리
                        <br />
                        무통장/실시간 계좌이체의 경우 고객님의 은행계좌로 이체되며, 신용카드의
                        경우 승인취소처리 됩니다.<br />
                        카드환불의 경우 카드사의 업무처리상 7-15일 가량 소요됩니다.<br /><br /><br />
                    </p>

                    <h6>교환/반품이 불가한 경우</h6>
                    <br />
                    <p>
                        - 주문제작되는 고객맞춤형 상품일 경우<br />
                        - 의류를 제외한 모든 악세사리 및 언더웨어, 세일상품은 반품 불가<br />
                        - 니트류나 쉽게 오염되는 화이트, 아이보리같은 계열의 상품인 경우<br />
                        - 고객님의 부주의로 인해 상품이 훼손이된 경우(착용흔적, 냄새포함)로 판매
                        가치가 떨어진 경우<br />
                        - 총 구매액을 적립금으로 결제한 경우<br />
                        - 상품 상세페이지에 반품불가라고 기재되어 있는 경우<br />
                        - 구입하신 제품의 교환은 1회에 한하여 가능합니다.
                    </p>




                    <button onClick={onAddReviewTest}>RE</button> 
                    &nbsp;
                    <button onClick={onAddQATest}>QA</button> 
                    
                </ProductAddInfoTextWrapper>
                {/* 텍스트 정보 */}
                          
            </PdDetailWrapper>

            <PaddingTB20/>
        </>
    );
};

export default ProductDetailTemplate;
