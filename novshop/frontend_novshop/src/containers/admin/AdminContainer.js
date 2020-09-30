import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminTemplate from "../../components/admin/AdminTemplate";
import { insertCategory } from '../../modules/category';

const AdminContainer = () => {
    const dispatch = useDispatch();
    const {category, categoryError} = useSelector(({category}) => {
        return {
            category: category.category,
            categoryError: category.categoryError,
        }
    });
    
    const createCategories = () => {
        dispatch(insertCategory({
            key: 'tesssswts',
            displayValue: 'ee',
            items: '',
        })) 
    }

    useEffect(() => {
        console.log(category, categoryError);
    }, [category, categoryError])

    return (
        <AdminTemplate
            createCategories = {createCategories}
        />
    );
};

export default AdminContainer;

/* 
        import categoryList from '../../lib/data/categoryList.json';               
       try {
            categoryList.map( (v) => {                
                return dispatch(
                    insertCategory({
                        key: v.key,
                        value: v.value,
                        items: v.items,
                    })
                );
            })
        } catch (error) {
            console.error(error);
            throw error;
        }
*/