import React, {useEffect} from 'react';
import LoginRegisterTemplate from "../../components/auth/LoginRegisterTemplate";
import { useSelector, useDispatch } from "react-redux";
import { changeField, initializeForm } from "../../modules/auth";

const RegisterContainer = () => {
    const dispatch = useDispatch();
    const { form } = useSelector( ({auth}) => {        
        return {
            form: auth.register,
        };
    } );
    
    const onChange = (e) => {
        const {name, value} = e.target;  

        dispatch(            
            changeField({                
                form: 'register',
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
            initializeForm('register')
        );
    }, [dispatch]);

    


    return (
        <LoginRegisterTemplate
            type = "register"
            onSubmit = {onSubmit}
            onChange = {onChange}
            form = {form}
        />
    );
};

export default RegisterContainer;