import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../modules/category";
import { logout } from '../../modules/user';

import Header from "../../components/base/Header";


const HeaderContainer = () => {  
    const [categoryData, setCategoryData] = useState([]);
    const dispatch = useDispatch();  
    const {userData, category, categoryStatus} = useSelector( ({user, category}) => {
        return {
            userData: user.user,
            categoryStatus: category.categoryStatus,
            category: category.category,
        }
    });

    const onLogout = () => {
        dispatch(logout());
    };
    
    useEffect(()=>{
        dispatch(getAllCategory());        
    }, [dispatch, category]);

    useEffect(()=>{
        if (categoryStatus) {
            const {data: arrayData} = categoryStatus;   

            if (arrayData) {            
                if (typeof arrayData.map !== 'function') return;

                let result = [];
                arrayData.map((v) => {
                    const {id, key, displayValue, items} = v;

                    return result.push({
                        id,
                        key,
                        displayValue: displayValue ? displayValue : key.toUpperCase(),
                        items: JSON.parse(items),
                    })
                });
                setCategoryData(result);
            }
        }
    }, [categoryStatus, category]);


    return (
        <Header
            userData = {userData && userData}
            onLogout = {onLogout}
            categoryData = {categoryData && categoryData}
        />
    )
};

export default withRouter(HeaderContainer);