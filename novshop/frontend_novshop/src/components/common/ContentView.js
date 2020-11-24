import React from 'react';
import 'quill/dist/quill.core.css';

// with Quill 
const ContentView = (props) => {
    const { content } = props;
    return (
        <div
            className={'ql-editor'}
            dangerouslySetInnerHTML={{
                __html: content,
            }}
        />
    );
};

export default ContentView;
