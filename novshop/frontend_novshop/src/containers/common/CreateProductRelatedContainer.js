import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { changeCategoryForm, initializeCategory } from "../../modules/category";
import { changeProductForm, initializeProduct, initializeProductItem } from "../../modules/product";
import CreateProductRelatedTemplate from '../../components/common/CreateProductRelatedTemplate';

const CreateProductRelatedContainer = (props) => {
    const {ctrlpage} = props;
 
    const { category, product } = useSelector( ({category, product}) => {   
        return {
            category: category.categoryForm,
            product: product.productForm
        };
    } );

    const dispatch = useDispatch();

    // input onChange
    const onChange = (e) => {
        let {name, value} = e.target;
        if (!name) return;  // 버튼에서 계속 name이 사라짐. (input type = 'button'로 하니까 해결됨)

        switch (ctrlpage) {            
            case 'createproduct': {                
                switch (name) {
                    case 'insertColors': {
                        value = product.color;                   
                        if(!value) return;
                        break;
                    }
                    case 'insertSizes': {
                        value = product.size;                        
                        if(!value) return;
                        dispatch(initializeProductItem({key: 'size'}));
                        break;
                    }
                    default:
                        break;
                }

                return dispatch(            
                    changeProductForm({                
                        key: name,
                        value,   
                    })
                );            
            }
            case 'createcategory': {             
                return dispatch(            
                    changeCategoryForm({                
                        key: name,
                        value,                                   
                    })
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

    // 페이지 초기화
    useEffect( () => {
        switch (ctrlpage) {
            case 'createproduct': {
                dispatch(initializeProduct()); 
                break;
            }
            case 'createcategory': {
                dispatch(initializeCategory()); 
                break;
            }
            default:
                break;
        }
    }, [dispatch, ctrlpage]);
        
    
    return (
        <CreateProductRelatedTemplate 
            ctrlpage = {ctrlpage}
            onChange = {onChange}            
            onDelete = {onDelete}
            category = {category && category}
            product = {product && product}
        />
    );
};

export default CreateProductRelatedContainer;
