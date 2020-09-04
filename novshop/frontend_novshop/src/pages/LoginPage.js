import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate'; 
import LoginForm from '../containers/auth/LoginForm';

const LoginPage = () => {
    return (        
        <AuthTemplate>  
        {/* 
            AuthTemplate의 children으로 LoginForm 들가는 듯함. 
            children 변수는 정해진 약속인듯. 진짜 children을 가리키는듯함.    
            200904 ADD, children은 props.children 이었음.            
        */}
            <LoginForm/>
        </AuthTemplate>        
    );
};
//  (24.2.1) END

export default LoginPage;