import React from 'react';
import BoxModel from '../components/common/BoxModel';

const MainPage = () => {
    return (
        <>
            <BoxModel backgroundColor = 'white'>
                <button>두리주와</button>
                <span>#C06C84</span>
            </BoxModel>
            <BoxModel backgroundColor = '#F67280' width = '30%' color = "white">
                #F67280
            </BoxModel>
            <BoxModel>그대가</BoxModel>
        </>
    )
};

export default MainPage;