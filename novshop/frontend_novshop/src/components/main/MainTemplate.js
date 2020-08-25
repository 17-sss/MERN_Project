import React from 'react';
import styled from 'styled-components';
import SwipeTemplate from './SwipeTemplate';
import {BoxModel} from '../common/StyleUtilModels';

const MainTemplateBlock = styled.div``;

const MainTemplate = () => {
    return (
        <MainTemplateBlock>
            <SwipeTemplate/>
            <BoxModel 
                padding="15% 0"                
            />
            <BoxModel 
                padding="15% 0"
                backgroundColor='skyblue'
            />
        </MainTemplateBlock>
    );
};

export default MainTemplate;