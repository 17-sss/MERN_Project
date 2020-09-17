import React from 'react';
import ReactDOM from 'react-dom';
// react-bootstrap 모듈 사용시 필수
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

// ** Redux 관련 START
// ▼    ./modules/index.js 파일 가리킴.
import rootReducer from "./modules";        
import { createStore }  from 'redux';
// ▼    컴포넌트에서 스토어를 사용할 수 있도록 Provider 가져옴. 아래 랜더 시 provider로 감쌈
import { Provider } from 'react-redux';  
// ▼    크롬 Redux DevTools 사용하기위해 사용
import { composeWithDevTools } from 'redux-devtools-extension';
// ** Redux 관련 END

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
    <Provider store = {store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
