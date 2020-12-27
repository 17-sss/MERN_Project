import React from 'react';
import { getSize } from '../lib/utility/customFunc';

const ErrorPage = (props) => {
    const { history } = props;
    const onClick = () => {
        history.goBack();
    };
    
    return (
        <div
            style={{ width: getSize(1), margin: '10px auto', textAlign: 'center', padding: "10rem" }}
        >
            <h1>잘못된 접근입니다.</h1>
            <button onClick={onClick}>돌아가기</button>
        </div>
    );
};

export default ErrorPage;
