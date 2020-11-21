import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { initializeWrite, changeWriteForm, createWriteNotice, createWriteQA } from '../../modules/write';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import WriteTemplate from '../../components/write/WriteTemplate';

const WriteContainer = (props) => {
    const { match } = props;
    const { params } = match;
    const { opt: page } = params;

    // redux 초기설정
    const dispatch = useDispatch();
    const { writeForm, userData } = useSelector(({ write, user }) => {
        return {
            writeForm: write.writeForm,
            userData: user.user,
        };
    });

    // Editor 내용 HTML 변환
    const editorToHtml = (editorState) => {
        return draftToHtml(convertToRaw(editorState.getCurrentContent()));
    };

    // state @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    const [user, setUser] = useState(null);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const rendered = useRef(false);     // Editor 쓰기 상태 (useState쓰면 useEffect 의존성 주의 알림 뜸)

    // hooks @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // 1. useCallback --
    const onChangeWriteForm = useCallback(
        ({ key, value }) => {
            dispatch(changeWriteForm({ key, value }));
        },
        [dispatch],
    );

    // 2. useEffect --
    // 1) 현재 유저 GET
    useEffect(() => {
        if (!userData) return;
        if (typeof userData === 'object') {
            setUser(userData.user);
            user &&
                dispatch(changeWriteForm({ key: 'userId', value: user.id }));
            user &&
                dispatch(
                    changeWriteForm({ key: 'userViewId', value: user.userid }),
                );
        }
    }, [userData, user, dispatch]);

    // 2) 페이지 초기화
    useEffect(() => {
        dispatch(initializeWrite({ page }));
    }, [dispatch, page]);

    // 3) Editor 제어 (wirteForm.content)
    useEffect(() => {
        // rendered 제어안하면 에디터 포커스 이상한데로 감
        if (rendered.current) return;        
        if (!writeForm.content) return;
        rendered.current = true;        
        
        const blocksFromHtml = htmlToDraft(writeForm.content);
        if (blocksFromHtml) {
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(
                contentBlocks,
                entityMap,
            );
            const editorState = EditorState.createWithContent(contentState);
            setEditorState(editorState);
        }
    }, [writeForm.content]);

    // events @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    const onChange = (e) => {
        e.preventDefault();
        const { name: key, value } = e.target;

        onChangeWriteForm({ key, value });
    };

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if (!writeForm) return;
        
        const { userId, subject, content, boardType } = writeForm;
        if (!boardType) return;
        
        switch (boardType) {
            case 'notice':
                return dispatch(createWriteNotice({userId, subject, content}));
            case 'qa':
                return dispatch(createWriteQA({ userId, productId: 1, subject, content, picture: '' }));;
            default:
                break;
        }
    }, [dispatch, writeForm]);

    const onEditorStateChange = (editorState) => {        
        setEditorState(editorState);
        onChangeWriteForm({ key: 'content', value: editorToHtml(editorState) });
    };

    return (
        <WriteTemplate
            events={{ onChange, onSubmit, onEditorStateChange, editorToHtml }}
            datas={{ writeForm, editorState }}
        />
    );
};

export default withRouter(WriteContainer);
