import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    changeCategoryForm,
    createCategory,
    initializeCategory,
} from '../../modules/category';
import {
    changeProductForm,
    createProduct,
    initializeProduct,
    initializeProductItem,
} from '../../modules/product';
import CreateProductRelatedTemplate from '../../components/admin/CreateProductRelatedTemplate';

const CreateProductRelatedContainer = (props) => {
    const { ctrlpage } = props;
    const {
        category, // ~: 전송이 완료된 경우
        categoryForm, // ~Form: 현재 작성하고 있는 값들
        categoryStatus, // 현재 데이터베이스에 있는 카테고리 정보들
        product,
        productForm,
    } = useSelector(({ category, product }) => {
        return {
            category: category.category,
            categoryForm: category.categoryForm,
            categoryStatus: category.categoryStatus,
            product: product.product,
            productForm: product.productForm,
        };
    });
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState(null);
    const [file, setFile] = useState(null); // image 파일을 서버로 전송하기 위한 state
    const [errorMessage, setErrorMesssage] = useState('');

    const dispatch = useDispatch();

    // input onChange
    const onChange = (e) => {
        let { name, value, files } = e.target;
        if (!name) return; // 버튼에서 계속 name이 사라짐. (input type = 'button'로 하니까 해결됨)

        switch (ctrlpage) {
            case 'createproduct': {
                switch (name) {
                    case 'image': {
                        // productForm.image는 그냥 보여지는 값일 뿐임. 서버엔 들어가지 않음.
                        // state - file이 들어감.
                        setFile(files[0]);
                        break;
                    }

                    case 'categoryId': {
                        let tmpCategory = null;
                        if (categories) {
                            if (
                                !productForm.categorySub ||
                                productForm.categorySub > 0
                            ) {
                                dispatch(
                                    initializeProductItem({
                                        key: 'categorySub',
                                    }),
                                );
                            }

                            tmpCategory = categories.filter((v) => {
                                return Number(v.id) === Number(value);
                            })[0];
                            setSubCategories(tmpCategory);
                        }
                        break;
                    }
                    default:
                        break;
                }
                // initializeProductItem({ key: 'size' })
                return [
                    dispatch(
                        changeProductForm({
                            key: name,
                            value,
                        }),
                    ),
                    name === "insertSizes" && dispatch(
                        initializeProductItem({ key: 'size' }),
                    ),
                ];
            }
            case 'createcategory': {
                return dispatch(
                    changeCategoryForm({
                        key: name,
                        value, //: name === "insertItems" ?  : value,
                    }),
                );
            }
            default:
                break;
        }
    };

    // result(span) 배열적인 아이템 Delete(미완)
    const onDelete = (e) => {
        const delItem = e.target.innerHTML;
        console.log(delItem);
    };

    // 서버로 데이터 전송
    const onSubmit = (e) => {
        e.preventDefault();

        switch (ctrlpage) {
            case 'createproduct': {
                const {
                    name,
                    // image,
                    sizes,
                    colors,
                    price,
                    sale,
                    description,
                    categorySub,
                    categoryId,
                } = productForm;

                // errormessage 정의 start..
                let bBreak = false;
                for (const key in productForm) {
                    if (bBreak) break;

                    switch (key) {
                        case 'size':
                        case 'color':
                        case 'sale':
                        case 'description':
                        case 'categorySub':
                            continue;

                        default: {
                            let value = productForm[key];
                            if (!value) {
                                switch (key) {
                                    case 'name':
                                        setErrorMesssage(
                                            '상품명을 입력해주세요.',
                                        );
                                        break;
                                    case 'image':
                                        setErrorMesssage(
                                            '이미지를 등록해주세요.',
                                        );
                                        break;
                                    case 'price':
                                        setErrorMesssage(
                                            '가격을 입력해주세요.',
                                        );
                                        break;

                                    case 'categoryId': {
                                        setErrorMesssage(
                                            '대분류 값을 등록해주세요.',
                                        );
                                        break;
                                    }
                                    default:
                                        break;
                                }
                                bBreak = true;
                            } else if (key === 'sizes' && value.length <= 0) {
                                setErrorMesssage('사이즈 정보를 등록해주세요.');
                                bBreak = true;
                                break;
                            } else if (key === 'colors' && value.length <= 0) {
                                setErrorMesssage('색상 정보를 등록해주세요.');
                                bBreak = true;
                                break;
                            } else {
                                continue;
                            }
                        }
                    }
                }
                // errormessage 정의 end..
                if (bBreak) return;

                dispatch(
                    createProduct({
                        name,
                        image: file,
                        sizes,
                        colors,
                        price,
                        sale,
                        description,
                        categorySub,
                        categoryId,
                    }),
                );
                break;
            }

            case 'createcategory': {
                const { key, displayValue, items } = categoryForm;

                if (!key) return setErrorMesssage('카테고리 키를 입력해주세요.');

                dispatch(
                    createCategory({
                        key,
                        displayValue: displayValue || key.toUpperCase(),
                        items,
                    }),
                );
                break;
            }
            default:
                break;
        }
    };

    // 페이지 초기화 (데이터가 전송됬을때도 초기화)
    // 1) category 생성
    useEffect(() => {
        if (ctrlpage === 'createcategory') {
            dispatch(initializeCategory());
            setErrorMesssage('');
        }
    }, [dispatch, ctrlpage, category]);
    // ---

    // 2) product 생성

    useEffect(() => {
        if (ctrlpage === 'createproduct') {
            dispatch(initializeProduct());
            setErrorMesssage('');

            // 대분류, 소분류 select box 생성하기 위해 categoryStatus 기반으로 재정의.
            if (categoryStatus && typeof categoryStatus === 'object') {
                if (
                    categoryStatus.hasOwnProperty('data') &&
                    categoryStatus.data instanceof Array
                ) {
                    const arrTmp = [];
                    categoryStatus.data.map((value) => {
                        let items = [];
                        let jsonItems = JSON.parse(value.items);

                        if (jsonItems.length > 0) {
                            jsonItems.map((v) => {
                                return items.push({
                                    id: v.id,
                                    displayValue: v.value,
                                });
                            });
                        }

                        return arrTmp.push({
                            id: value.id,
                            displayValue:
                                value.displayValue ||
                                String(value.key).toUpperCase(),
                            items,
                        });
                    });
                    setCategories(arrTmp);
                }
            }
        }
    }, [dispatch, ctrlpage, product, categoryStatus]);
    // ---

    return (
        <CreateProductRelatedTemplate
            ctrlpage={ctrlpage}
            onChange={onChange}
            onDelete={onDelete}
            onSubmit={onSubmit}
            errorMessage={errorMessage}
            // 1) 카테고리
            categoryForm={categoryForm && categoryForm}
            // --
            // 2) 상품
            productForm={productForm && productForm}
            categories={categories && categories}
            subCategories={subCategories && subCategories}
            // --
        />
    );
};

export default CreateProductRelatedContainer;
