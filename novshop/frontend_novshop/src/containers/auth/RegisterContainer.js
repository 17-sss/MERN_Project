import React from 'react';
import LoginRegisterTemplate from "../../components/auth/LoginRegisterTemplate";

const onSubmit = (e) => {
    e.preventDefault();
};

const RegisterContainer = () => {
    return (
        <LoginRegisterTemplate
            type = "register"
            onSubmit = {onSubmit}
        />
    );
};

export default RegisterContainer;