import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { initializeNotice, getNotice } from '../../modules/notice';

import CommunityViewTemplate from '../../components/community/CommunityViewTemplate';


const CommunityViewContainer = (props) => {
    const { num, match, location } = props;
    const { pathname, search } = location;
    const { page } = match.params;    
    const pageName = page === 'cs' ? '고객센터' : '공지사항';

    const dispatch = useDispatch();
    const {noticeStatus, noticeLoading} = useSelector(({notice, loading}) => {
        return {
            noticeStatus: notice.noticeStatus,
            noticeLoading: loading['notice/GET_NOTICE'],
        }
    });

    useEffect(()=> {
        dispatch(initializeNotice());       
        dispatch(getNotice({id: num}));
    }, [dispatch, num])

    const etcDatas = {
        num,
        page,
        pageName,
        listurl: (pathname + search),
    };

    return noticeLoading || <CommunityViewTemplate etcDatas={etcDatas} data={noticeStatus && noticeStatus.data}  />;
};

export default withRouter(CommunityViewContainer);
