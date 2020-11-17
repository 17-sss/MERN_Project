import React from 'react';
import styled/*, { css }*/ from 'styled-components';
import { getSize } from '../../lib/utility/customFunc';
import { cssCustomInput } from "../../components/common/StyleUtilCSS";

import EditorContainer from '../../containers/write/EditorContainer';

const WriteWrapper = styled.div`
    width: ${getSize(1.45)};
    margin: 0 auto;
`;

const WirteInput = styled.input`
    ${cssCustomInput}
`;

const WriteTemplate = () => {
    return (
        <WriteWrapper>
            <WirteInput type="text" name="subject" placeholder="제목" />            
            <EditorContainer />
        </WriteWrapper>
    );
};

export default WriteTemplate;
