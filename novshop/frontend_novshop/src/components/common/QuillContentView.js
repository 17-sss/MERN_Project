import React from "react";
import 'quill/dist/quill.core.js';
import 'quill/dist/quill.core.css';

const QuillContentView = (props) => {
    const {content} = props;
    // quill class들 제대로 못불러옴 연구필요
    return (        
        <div
            dangerouslySetInnerHTML={{
                __html: content,
            }}
        />
    );
};

export default QuillContentView;