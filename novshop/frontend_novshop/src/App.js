import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useGetWindowInnerEvent } from './lib/utility/customHooks';

import Header from './components/base/Header';
import Footer from './components/base/Footer';

import MainPage from './pages/MainPage';
import ShoppingPage from './pages/ShoppingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MemberPage from './pages/MemberPage';

const App = () => {
    const windowSize = useGetWindowInnerEvent();
    
    if (windowSize.width >= 750) {
        return (
            <>
                {/* 
                  // Main 
                  1. exact 이게 붙어있으면 주어진 경로와 정확히 맞아 떨어져야만 설정한 컴포넌트를 보여줌 
                  2. path설정은 path={['/@:username', '/']} 이런 식으로도 가능
                */}
                <Header />
                
                <Switch>
                    <Route component={MainPage} path="/" exact />
                    {/* // Shopping */}
                    <Route component={ShoppingPage} path="/shopping/@:category" />
                    {/* // Register (회원가입) */}
                    <Route component={RegisterPage} path="/member/join" exact />
                    {/* // Login (로그인) */}
                    <Route component={LoginPage} path="/login" />
                    {/* // Member (회원정보) */}
                    <Route component={MemberPage} path="/member/@:username" />
                </Switch>

                <Footer />
            </>
        );
    } else {
        return (
            <div>
                {windowSize.width}px / {windowSize.height}px
            </div>
        );
    }
};

export default App;
