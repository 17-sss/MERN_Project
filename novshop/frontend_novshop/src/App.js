import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import { useGetWindowInnerEvent } from './lib/utility/customHooks';  사이즈에 따라 모바일앱처럼 변경하려했으나, 안함.

import Header from './components/base/Header';
import Footer from './components/base/Footer';

import MainPage from './pages/MainPage';
import ShoppingPage from './pages/ShoppingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MemberPage from './pages/MemberPage';

const App = () => {    
    return (
        <>                  
            <Header/>      
            <Switch>
                <Route exact component={MainPage} path="/"  />
                {/* // Shopping (
                        1. path ▷ (대분류)카테고리 & (소분류)카테고리.종류
                        2. querystring ▷ 
                            + 라우트 내부 (ShoppingPage 파일)에서 query-string 미들웨어 사용하여 해결하기.
                */}
                <Route component={ShoppingPage} path="/shopping/:category/:subcategory?" />                 
                {/* // Register (회원가입) */}
                <Route component={RegisterPage} path="/member/join" />
                {/* // Login (로그인) */}
                <Route component={LoginPage} path="/login" />
                {/* // Member (회원정보) */}
                <Route component={MemberPage} path="/member/@:username" />
            </Switch>

            <Footer />
        </>
    );
};

export default App;
