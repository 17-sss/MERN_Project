import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate'; 
import LoginForm from '../containers/auth/LoginContainer';

const LoginPage = () => {
    return (        
        <AuthTemplate>  
            <LoginForm/>
        </AuthTemplate>        
    );
};

export default LoginPage;