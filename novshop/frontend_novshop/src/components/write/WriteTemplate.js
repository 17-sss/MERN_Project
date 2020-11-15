import React from 'react';
import styled, { css } from 'styled-components';
import { getSize } from '../../lib/utility/customFunc';

const WriteWrapper = styled.div`
    width: ${getSize(1.45)};
    margin: 0 auto;
`;

const WriteTemplate = () => {
    return (
        <WriteWrapper>WriteTemplate</WriteWrapper>
    );
};

export default WriteTemplate;
