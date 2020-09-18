import React, {useEffect} from 'react';
import LoginRegisterTemplate from "../../components/auth/LoginRegisterTemplate";
import { useSelector, useDispatch } from "react-redux";
import { changeField, initializeForm } from "../../modules/auth";

const LoginContainer = () => {
        const dispatch = useDispatch();
    const { form } = useSelector( ({auth}) => {        
        return {
            form: auth.login,
        };
    } );
    
    const onChange = (e) => {
        const {name, value} = e.target;  

        dispatch(            
            changeField({
                
                form: 'login',
                key: name,
                value,
                
            })
        );
    };
    
    const onSubmit = (e) => {
        e.preventDefault();        
    };


    useEffect(() => {
        dispatch(
            initializeForm('login')
        );
    }, [dispatch]);

    


    return (
        <LoginRegisterTemplate
            type = "login"
            onSubmit = {onSubmit}
            onChange = {onChange}
            form = {form}
        />
    );
};

export default LoginContainer;