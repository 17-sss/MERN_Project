import React, {useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';  
import LoginRegisterTemplate from "../../components/auth/LoginRegisterTemplate";
import { useSelector, useDispatch } from "react-redux";
import { changeField, initializeForm, login } from "../../modules/auth";
import { check } from '../../modules/user';


const LoginContainer = ({history}) => {
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector( ({auth, user}) => {   

        return {
            form: auth.login,
            auth: auth.auth,
            authError: auth.authError,
            user: user.user,
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
        
        const {userid, userpwd} = form;
        dispatch(login({userid, userpwd}));
    };

    // 컴포넌트가 처음 렌더링될 때 form을 초기화
    useEffect(() => {
        dispatch(
            initializeForm('login')
        ); 
    }, [dispatch]);

    // 로그인 여부 체크
    useEffect(() => {
        if (authError) {            
            console.log('로그인 오류 발생');
            console.log(authError);

            setError('로그인 오류 발생');
            return;
        }

        if (auth) {            
            const {success} = auth;
            success && console.log('로그인 성공');
            
            dispatch(check());
        }
    }, [authError, auth, dispatch]);

    
    // (추후 구현) 로그인 성공 후, 메인으로 이동.
    useEffect(() => {
        if (user) {
            history.push('/');
        }
    }, [history, user])
    


    return (
        <LoginRegisterTemplate
            type = "login"
            onSubmit = {onSubmit}
            onChange = {onChange}
            form = {form}
            error = {error}
        />
    );
};

// ▼ history 개체 같은거 이용하려할때, withRouter로 해당 개체 감싸면댐.(여기선 LoginContainer)
export default withRouter(LoginContainer);