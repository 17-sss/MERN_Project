import React from 'react';
import LoginRegisterTemplate from "../../components/auth/LoginRegisterTemplate";

const onSubmit = (e) => {
    e.preventDefault();
};

const LoginContainer = () => {
    return (
        <LoginRegisterTemplate
            type = "login"
            onSubmit = {onSubmit}
        />
    );
};

export default LoginContainer;