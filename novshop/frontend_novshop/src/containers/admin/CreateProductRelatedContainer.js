import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCategoryForm, initializeCategory } from '../../modules/category';
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

    const dispatch = useDispatch();

    // input onChange
    const onChange = (e) => {
        let { name, value, files } = e.target;
        if (!name) return; // 버튼에서 계속 name이 사라짐. (input type = 'button'로 하니까 해결됨)

        switch (ctrlpage) {
            case 'createproduct': {
                switch (name) {
                    case 'image': {
                        productForm.image = files[0];                 
                        break;
                    }

                    case 'insertColors': {
                        value = productForm.color;
                        if (!value) return;
                        break;
                    }
                    case 'insertSizes': {
                        value = productForm.size;
                        if (!value) return;

                        dispatch(initializeProductItem({ key: 'size' }));
                        break;
                    }
                    
                    case 'categoryId': {
                        let tmpCategory = null;
                        if (categories) {
                            if (!productForm.categorySub || productForm.categorySub > 0) {
                                dispatch(initializeProductItem({ key: 'categorySub' }));
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

                return dispatch(
                    changeProductForm({
                        key: name,
                        value,
                    }),
                );
            }
            case 'createcategory': {
                return dispatch(
                    changeCategoryForm({
                        key: name,
                        value,
                    }),
                );
            }
            default:
                break;
        }
    };

    // result(span) 배열적인 아이템 Delete
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
                    image,
                    sizes,
                    colors,
                    price,
                    sale,
                    description, 
                    categorySub, 
                    categoryId, 
                } = productForm;
                dispatch(                    
                    createProduct({
                        name,
                        image,
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
                //dispatch(());
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
        }
    }, [dispatch, ctrlpage, category]);
    // ---

    // 2) product 생성

    useEffect(() => {
        if (ctrlpage === 'createproduct') {
            dispatch(initializeProduct());

            if (categoryStatus && typeof categoryStatus === 'object') {
                if ( categoryStatus.hasOwnProperty('data') && categoryStatus.data instanceof Array ) {
                    const arrTmp = [];
                    categoryStatus.data.map((value) => {
                        let items = [];
                        let jsonItems = JSON.parse(value.items);

                        if (jsonItems.length > 0) {
                            jsonItems.map((v) => {
                                return items.push({
                                    id: v.id,
                                    displayValue: v.value,
                                })
                            })
                        };

                        return arrTmp.push({
                            id: value.id,
                            displayValue: (value.displayValue || String(value.key).toUpperCase()),
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
