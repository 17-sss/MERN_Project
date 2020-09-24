import React, {useEffect} from 'react';
import LoginRegisterTemplate from "../../components/auth/LoginRegisterTemplate";
import { useSelector, useDispatch } from "react-redux";
import { changeField, initializeForm, register } from "../../modules/auth";

const RegisterContainer = () => {
    const dispatch = useDispatch();
    const { form, auth, authError } = useSelector( ({auth}) => {        
        /* 
            useSelector에서 불러오는 auth는 /modules/auth.js의 auth 리듀서
            여기서 console.log(auth) 해보면, auth의 initialState 값나옴.   
            즉 리덕스에 저장되어있는거 불러오는 듯.
        */
        return {
            form: auth.register,    // auth['register'] 도 가능
            auth: auth.auth,
            authError: auth.authError,
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
    
    /*
        ** onSubmit 이벤트가 발생했을 때 
            1. register 함수에 현재 userid userpwd usernick 파라미터로 넣어서 액션을 디스패치.
            2. 사가에서 API 요청을 처리.    이에 대한 결과는 auth, authError에서 확인가능   
    */
    const onSubmit = (e) => {
        e.preventDefault();        
        const {userid, userpwd, usernick, userpwdConfirm } = form;  
        
        if (userpwd !== userpwdConfirm) {
            // 오류처리
            console.log('비번 틀렸다 앙마야');
            return;
        }
        dispatch(register({userid, userpwd, usernick}));
    };

    // 컴포넌트가 처음 렌더링될 때 초기화.
    useEffect(() => {
        dispatch(
            initializeForm('register')
        );
    }, [dispatch]);

    // 회원가입 성공 or 실패 처리
    useEffect(()=> {
        if (authError) {
            console.log('회원가입 오류 발생');
            console.log(authError);
            return;
        }

        if (auth) {
            const {success} = auth;
            console.log(auth);
            success && console.log('회원가입 성공');            
        }
    }, [auth, authError])
    

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