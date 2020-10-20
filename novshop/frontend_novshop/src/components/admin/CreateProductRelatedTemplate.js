import React from 'react';
import styled, { css } from 'styled-components';
import { TransparentBtn } from '../common/StyleUtilModels';
import { cssCustomInput, cssCustomSpan } from '../common/StyleUtilCSS';
import { getSize, randomColor } from '../../lib/utility/customFunc';

// 1) CreateProductRelatedWrapper: 전체 Wrapper
const CreateProductRelatedWrapper = styled.div`
    width: ${getSize(1.45)};
    margin: 0 auto;
`;

// 2) InputWrapper: 입력 폼 Wrapper
const InputWrapper = styled.div`
    width: ${getSize(3)};
    padding: ${(props) => props.padding || '4% 0 4%'};
    margin: 0 auto;

    ${(props) =>
        props.alignCenter &&
        css`
            text-align: center;
            align-items: center;
            justify-content: center;
        `};
`;

// 2-1) Input: 현재 폼 Input
const Input = styled.input`
    /* 
        [!] 현재 폼에서 Input 태그 type이 button일 경우,
            상품 - 색상, 사이즈 || 카테고리-소분류 정보 등 작성한 값을 확정하여 
            (리덕스) colors, sizes 등에 전달하는 버튼으로 사용
    */
    ${cssCustomInput}
`;

// 2-2) TextArea: 현재 폼 textarea
const TextArea = styled.textarea`
    ${cssCustomInput}
`;

// 2-3) StyledP: Styled된 p 태그
const StyledP = styled.p`
    font-size: 16px;
    color: rgb(163, 163, 163);
    margin: ${(props) => props.margin || '8px 0px 4px 0px'};
`;

// 2-4) SelectBox: 분류 선택용 콤보박스 (select)
const SelectBox = styled.select`
    ${cssCustomInput};
    width: 50%;
    color: rgb(163, 163, 163);
`;

// 2-4-1) StyledOpt: select 태그의 option 태그
const StyledOpt = styled.option`
    color: ${(props) => props.noblack || 'black'};
`;

// 3) ResultSpanWrapper: 상품 - 색상, 사이즈 || 카테고리-소분류 정보 등 추가한 결과물들을 보여주는 ResultSpan를 위한 Wrapper
const ResultSpanWrapper = styled.div`
    width: 100%;
    height: auto;
    word-break: break-all; /* 텍스트가 div영역을 나가버려서 추가. */
    margin-bottom: 10px;
`;

// 3-1) ResultSpan: 상품 - 색상, 사이즈 || 카테고리-소분류 정보 등 추가한 결과물들을 보여주는 Span
// randomcolor 사용하기에 attrs 사용.
const ResultSpan = styled.span.attrs(props => props.randomColor && ({
    style: {
        color: randomColor(),
    }
}))`${cssCustomSpan}`;
/*
// 일반 styled
const ResultSpan = styled.span`
    ${cssCustomSpan}
    ${props => props.randomColor && css`
        color: ${randomColor()};
    `}
`;
*/


// 4) SubmitBtn: 전송버튼
const SubmitBtn = styled(TransparentBtn)`
    width: 70%;
    height: 30px;
    margin-top: 14px;
    color: #212121;

    background-color: #cccfd1;
    border-radius: 2px;
    box-shadow: 0.2px 0.2px 0.2px 0.2px lightgray;

    &:hover {
        background-color: #ededed;
    }
`;

// -------------------------------------------------------------------------/

const CreateProductRelatedTemplate = (props) => {
    const {
        ctrlpage,
        onChange,
        onDelete,
        onSubmit,
        errorMessage,
        categoryForm,
        productForm,
        categories,
        subCategories,
    } = props;

    return (
        <CreateProductRelatedWrapper>
            <InputWrapper>
                <form onSubmit={onSubmit} encType='multipart/form-data'>
                    <Input
                        type="text"
                        name={ctrlpage === 'createproduct' ? 'name' : 'key'}
                        placeholder={
                            ctrlpage === 'createproduct'
                                ? '상품명'
                                : '카테고리 Key (영문, 숫자)'
                        }
                        onChange={onChange}
                        value={
                            ctrlpage === 'createproduct'
                                ? productForm.name
                                : categoryForm.key
                        }
                    />

                    <Input
                        type={
                            ctrlpage === 'createproduct'
                            ? 'file'
                            : 'text'
                        }
                        accept={
                            (ctrlpage === 'createproduct') ? "image/*" : undefined
                        }
                        name={
                            ctrlpage === 'createproduct'
                                ? 'image'
                                : 'displayValue'
                        }
                        placeholder={
                            ctrlpage === 'createproduct'
                                ? '상품 이미지 경로 (불러오기)'
                                : '페이지에 보일 값'
                        }
                        onChange={onChange}
                        value={
                            ctrlpage === 'createproduct'
                                ? productForm.image
                                : categoryForm.displayValue
                        }
                    />

                    {ctrlpage === 'createproduct' ? (
                        <>
                            <Input
                                type="text"
                                name="size"
                                placeholder="상품 사이즈"
                                onChange={onChange}
                                value={productForm.size}
                                addcss={css`
                                    width: 95%;
                                    margin-top: 16px;
                                `}
                            />
                            <Input
                                type="button" // button
                                name="insertSizes"
                                value="+"
                                onClick={onChange}
                                addcss={css`
                                    width: 5%;
                                `}
                            />
                            <ResultSpanWrapper>
                                {productForm.sizes &&
                                    productForm.sizes.map((v, i) => {
                                        return (
                                            <ResultSpan
                                                key={i}
                                                onClick={onDelete}
                                            >
                                                {v}
                                            </ResultSpan>
                                        );
                                    })}
                            </ResultSpanWrapper>
                        </>
                    ) : (
                        <>
                            <Input
                                type="text"
                                name="itemKey"
                                placeholder="소분류 Key (영문, 숫자)"
                                onChange={onChange}
                                value={categoryForm.itemKey}
                                addcss={css`
                                    width: 47.5%;
                                    margin-top: 16px;
                                `}
                            />
                            <Input
                                type="text"
                                name="itemValue"
                                placeholder="소분류 value"
                                onChange={onChange}
                                value={categoryForm.itemValue}
                                addcss={css`
                                    width: 47.5%;
                                    margin-top: 16px;
                                `}
                            />
                            <Input
                                type="button" // button
                                name="insertItems"
                                value="+"
                                onClick={onChange}
                                addcss={css`
                                    width: 5%;
                                `}
                            />
                            <ResultSpanWrapper>                                
                                {categoryForm.items && categoryForm.items.map((v) => {                                                              
                                    return (
                                        <ResultSpan key = {v.id} randomColor>
                                            {v.key} &amp; {v.value} 
                                        </ResultSpan>
                                    )
                                })}                                
                            </ResultSpanWrapper>
                        </>
                    )}

                    {ctrlpage === 'createproduct' && (
                        <>
                            <>
                                <StyledP>색상</StyledP>
                                <Input
                                    type="color"
                                    name="color"
                                    placeholder="색상정보 (배열)"
                                    onChange={onChange}
                                    value={productForm.color}
                                    addcss={css`
                                        width: 95%;
                                    `}
                                />
                                <Input
                                    type="button" // button
                                    name="insertColors"
                                    value="+"
                                    onClick={onChange}
                                    addcss={css`
                                        position: relative;
                                        top: -10px;
                                        width: 5%;
                                    `}
                                />
                                <ResultSpanWrapper>
                                    {productForm.colors &&
                                        productForm.colors.map((v, i) => {
                                            return (
                                                <ResultSpan
                                                    color={v}
                                                    key={i}
                                                    onClick={onDelete}
                                                >
                                                    {v}
                                                </ResultSpan>
                                            );
                                        })}
                                </ResultSpanWrapper>
                            </>

                            <StyledP margin="8px 0 0 0">가격</StyledP>
                            <Input
                                type="number"
                                name="price"
                                min="1000"
                                max="9999999"
                                onChange={onChange}
                                value={productForm.price}
                            />
                            <StyledP margin="8px 0 0 0">세일가</StyledP>
                            <Input
                                type="number"
                                name="sale"
                                min="0"
                                max="9999999"
                                onChange={onChange}
                                value={productForm.sale}
                            />
                            <TextArea
                                name="description"
                                rows="2"
                                /* cols="50" */
                                placeholder="부가설명"
                                onChange={onChange}
                                value={productForm.description}
                                style={{ width: '100%' }}
                            />
                            <SelectBox name="categoryId" 
                                onChange={onChange}
                                value={productForm.categoryId || 0}
                            >
                                <StyledOpt value={0} noblack disabled>
                                    카테고리 대분류 선택
                                </StyledOpt>
                                {categories && 
                                    categories.map((v)=>{
                                        return (
                                            <StyledOpt key={v.id} value={v.id}>
                                                {v.displayValue}
                                            </StyledOpt>
                                        );
                                    } 
                                )}
                            </SelectBox>
                            <SelectBox name="categorySub"                                 
                                onChange={onChange} 
                                disabled={!(subCategories && subCategories.items.length > 0)}                                
                                value={productForm.categorySub || 0}
                            >
                                <StyledOpt value={0} noblack disabled>
                                    카테고리 소분류 선택
                                </StyledOpt>                                
                                {subCategories &&                                     
                                    subCategories.items.map((v) => {                                        
                                        return (
                                            <StyledOpt key={v.id} value={v.id}>
                                                {v.displayValue}
                                            </StyledOpt>
                                        );
                                    })
                                }
                            </SelectBox>
                        </>
                    )}

                    <InputWrapper alignCenter padding={'0px'}>
                        {errorMessage && (
                            <p style={{color: 'red'}}>{errorMessage}</p>
                        )}
                        <SubmitBtn type="submit">전송</SubmitBtn>
                    </InputWrapper>
                </form>
            </InputWrapper>
        </CreateProductRelatedWrapper>
    );
};

export default CreateProductRelatedTemplate;
