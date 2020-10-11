import React from 'react';
import styled, { css } from 'styled-components';
import {
    CustomInput,
    CustomInputOptionBtn,
    CustomInputOptionResult,
} from '../../components/common/StyleUtilModels';
import { getSize } from '../../lib/utility/customFunc';

const CreateProductRelatedWrapper = styled.div`
    width: ${getSize(1.45)};
    margin: 0 auto;
`;

const InputForm = styled.form`
    width: ${getSize(3)};
    padding: 4% 0 4%;
    margin: 0 auto;

    /*
    padding-top: ${getSize(10)};
    padding-bottom: ${getSize(7)};
    text-align: center;
    align-items: center;
    justify-content: center;
    */
`;

const CustomInputOptionResultWrapper = styled.div`
    margin-bottom: 10px;
`;

const CreateProductRelatedTemplate = (props) => {
    const { ctrlpage, onChange, category, product } = props;

    return (
        <CreateProductRelatedWrapper>
            <InputForm>
                <CustomInput
                    name={ctrlpage === 'createproduct' ? 'name' : 'key'}
                    placeholder={
                        ctrlpage === 'createproduct'
                            ? '상품명'
                            : '카테고리 키 (영문)'
                    }
                    type="text"
                    onChange={onChange}
                    value={
                        ctrlpage === 'createproduct'
                            ? product.name
                            : category.key
                    }
                />

                <CustomInput
                    name={
                        ctrlpage === 'createproduct' ? 'image' : 'displayValue'
                    }
                    placeholder={
                        ctrlpage === 'createproduct'
                            ? '상품 이미지 경로 (불러오기)'
                            : '페이지에 보일 값'
                    }
                    type="text"
                    onChange={onChange}
                    value={
                        ctrlpage === 'createproduct'
                            ? product.image
                            : category.displayValue
                    }
                />

                {ctrlpage === 'createproduct' ? (
                    <>
                        <CustomInput
                            name="size"
                            placeholder="상품 사이즈"
                            type="text"
                            onChange={onChange}
                            value={product.size}
                            addcss={css`
                                width: 95%;
                                margin-top: 16px;
                            `}
                        />
                        <CustomInputOptionBtn
                            name="insertSizes"
                            onClick={onChange}
                            addcss={css`
                                width: 5%;
                            `}
                        />
                        <CustomInputOptionResultWrapper>
                            {product.sizes &&
                                product.sizes.map((v, i) => {
                                    return (
                                        <CustomInputOptionResult
                                            key = {i}
                                        >
                                            {v}
                                        </CustomInputOptionResult>
                                    );
                                })}
                        </CustomInputOptionResultWrapper>
                    </>
                ) : (
                    <>
                        <CustomInput
                            name="itemKey"
                            placeholder="소분류 key"
                            type="text"
                            onChange={onChange}
                            value={category.itemKey}
                            addcss={css`
                                width: 47.5%;
                                margin-top: 16px;
                            `}
                        />
                        <CustomInput
                            name="itemValue"
                            placeholder="소분류 value"
                            type="text"
                            onChange={onChange}
                            value={category.itemValue}
                            addcss={css`
                                width: 47.5%;
                                margin-top: 16px;
                            `}
                        />
                        <CustomInputOptionBtn
                            name="insertItems"
                            onClick={onChange}
                            addcss={css`
                                width: 5%;
                            `}
                        />
                        <CustomInputOptionResultWrapper>
                            <CustomInputOptionResult>
                                {category.items}
                            </CustomInputOptionResult>
                        </CustomInputOptionResultWrapper>
                    </>
                )}

                {ctrlpage === 'createproduct' && (
                    <>
                        <>
                            <CustomInput
                                name="color"
                                placeholder="색상정보 (배열)"
                                type="color"
                                onChange={onChange}
                                value={product.color}
                                addcss={css`
                                    width: 95%;
                                `}
                            />
                            <CustomInputOptionBtn
                                name="insertColors"
                                onClick={onChange}
                                addcss={css`
                                    position: relative;
                                    top: -10px;
                                    width: 5%;
                                `}
                            />
                            <CustomInputOptionResultWrapper>
                                {product.colors &&
                                    product.colors.map((v, i) => {
                                        return (
                                            <CustomInputOptionResult
                                                color={v}
                                                key={i}
                                            >
                                                {v}
                                            </CustomInputOptionResult>
                                        );
                                    })}
                            </CustomInputOptionResultWrapper>
                        </>

                        <CustomInput
                            name="price"
                            placeholder="가격"
                            type="number"
                            min="1000"
                            max="9999999"
                            onChange={onChange}
                            value={product.price}
                        />
                        <CustomInput
                            name="sale"
                            placeholder="세일가"
                            type="number"
                            min="0"
                            max="9999999"
                            onChange={onChange}
                            value={product.sale}
                        />
                        <CustomInput
                            // textarea로 변경해야함
                            name="description"
                            placeholder="부가설명"
                            type="text"
                            onChange={onChange}
                            value={product.description}
                        />
                        <CustomInput
                            name="categorySub"
                            placeholder="카테고리 소분류 (id)"
                            type="콤보박스사용"
                            onChange={onChange}
                            value={product.categorySub}
                        />
                        <CustomInput
                            name="categoryId"
                            placeholder="카테고리 대분류 (id)"
                            type="콤보박스사용"
                            onChange={onChange}
                            value={product.categoryId}
                        />
                    </>
                )}
            </InputForm>
        </CreateProductRelatedWrapper>
    );
};

export default CreateProductRelatedTemplate;
