import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import Header from "../../components/base/Header";
import { logout } from '../../modules/user';



const HeaderContainer = () => {  
    const dispatch = useDispatch();  
    const userData = useSelector( ({user}) => (user.user) );

    const onLogout = () => {
        dispatch(logout());
    }
    

    return (
        <Header
            user= {userData && userData}
            onLogout = {onLogout}
        />
    )
};

export default withRouter(HeaderContainer);