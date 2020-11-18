import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { initializeWrite, changeWriteForm } from '../../modules/write';
import { EditorState } from 'draft-js';
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

    // state
    const [user, setUser] = useState(null);    
    const [editorState, setEditorState] = useState(EditorState.createEmpty());    

    // hooks
    // 1) 현재 유저 GET // 유저정보.. 서버에서 가져와야할거같은데?
    useEffect(() => {   
        if (!userData) return;
        if (typeof userData === "object") {            
            setUser(userData.user);
            user && dispatch(changeWriteForm({key: 'userId', value: user.id}));
            user && dispatch(changeWriteForm({key: 'userViewId', value: user.userid}))
        }
    }, [userData, user, dispatch]);

    // 2) 페이지 초기화
    useEffect(() => {                
        dispatch(initializeWrite({page}));          
    }, [dispatch, page]);

    // 3) content change 동기화
    useEffect(() => {        
        dispatch(changeWriteForm({key: 'content', value: editorState}));
    }, [dispatch, editorState]);
    
    // events
    const onChange = (e) => {
        e.preventDefault();
        const { name: key, value } = e.target;

        dispatch(changeWriteForm({key, value}));        
    };

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    };

    return (
        <WriteTemplate
            events={{ onChange, onEditorStateChange }}
            datas={{ writeForm, editorState }}
        />
    );
};

export default withRouter(WriteContainer);
