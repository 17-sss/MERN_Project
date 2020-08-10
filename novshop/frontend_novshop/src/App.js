import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ShoppingPage from './pages/ShoppingPage';
import MemberPage from './pages/MemberPage';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <>
      {/* 
        // Main 
        1. exact 이게 붙어있으면 주어진 경로와 정확히 맞아 떨어져야만 설정한 컴포넌트를 보여줌 
        2. path설정은 path={['/@:username', '/']} 이런 식으로도 가능
      */}
      <Route component = {MainPage} path = "/" exact />      
      {/* // Shopping */}
      <Route component = {ShoppingPage} path = "/shopping/:categoryName" /> 
      {/* // Member (회원가입) */}
      <Route component = {MemberPage} path = "/member/join" />
      {/* // Login (로그인) */}
      <Route component = {LoginPage} path = "/login" />
    </>
  )
}

export default App;
