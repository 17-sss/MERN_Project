import React, {useState} from 'react';
import { EditorState } from 'draft-js';
import EditorTemplate from "../../components/write/EditorTemplate";

const EditorContainer = () => {
    // useState로 상태관리하기 초기값은 EditorState.createEmpty()
    // EditorState의 비어있는 ContentState 기본 구성으로 새 개체를 반환 => 이렇게 안하면 상태 값을 나중에 변경할 수 없음.
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (editorState) => {
        // editorState에 값 설정
        setEditorState(editorState);
    };

    return <EditorTemplate editorState = {editorState} onEditorStateChange={onEditorStateChange} />;
};

export default EditorContainer;
