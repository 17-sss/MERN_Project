import React, {useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { changeField, initializeForm, register, login } from "../../modules/auth";
import { check } from "../../modules/user";

import LoginRegisterTemplate from "../../components/auth/LoginRegisterTemplate";



const RegisterContainer = ({history}) => {
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector( ({auth, user}) => {        
        /* 
            useSelector에서 불러오는 auth는 /modules/auth.js의 auth 리듀서
            여기서 console.log(auth) 해보면, auth의 initialState 값나옴.   
            즉 리덕스에 저장되어있는거 불러오는 듯.
        */
        return {
            form: auth.register,    // auth['register'] 도 가능
            auth: auth.auth,
            authError: auth.authError,
            user: user.user
        };
    });
    
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
    
    /*
        ** onSubmit 이벤트가 발생했을 때 
            1. register 함수에 현재 userid userpwd usernick 파라미터로 넣어서 액션을 디스패치.
            2. 사가에서 API 요청을 처리.    이에 대한 결과는 auth, authError에서 확인가능   
    */
    const onSubmit = (e) => {
        e.preventDefault();        
        const {userid, userpwd, usernick, userpwdConfirm } = form;  
        
        if (userpwd !== userpwdConfirm) {            
            setError('비밀번호를 확인해주세요.');
            return;
        }

        dispatch(register({userid, userpwd, usernick}));
    };

    // 컴포넌트가 처음 렌더링될 때 초기화.
    useEffect(() => {        
        dispatch(
            initializeForm('register'),
        );        
    }, [dispatch]);

    // 회원가입 성공 or 실패 처리
    useEffect(()=> {
        if (authError) {
            const {data, status} = authError;           

            if (status === 409 || status === 500) {
                setError(data.message);                
            }
            return;
        }

        if (auth) {
            const {success} = auth;            
            success && console.log('회원가입 성공');   
            
            const {userid, userpwd} = form;
            dispatch(login({userid, userpwd}));
            dispatch(check());
        }
    }, [auth, authError, dispatch, form])

    // 회원가입 성공 후, 유저 체크
    useEffect(() => {
        if (user) {
            history.push('/');
            
            // 로그인 상태 유지하기위해 브라우저에 내장되어있는 localStorage 사용
            try {                
                localStorage.setItem('user', JSON.stringify(user));                
            } catch (error) {
                console.log('localStorage is not working');
            }
        }
    }, [history, user])
    

    return (
        <LoginRegisterTemplate
            type = "register"
            onSubmit = {onSubmit}
            onChange = {onChange}
            form = {form}
            error = {error}
        />
    );
};

export default withRouter(RegisterContainer);