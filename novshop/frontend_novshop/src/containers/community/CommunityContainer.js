import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { initializeQA, getProductQA } from '../../modules/qa';
import { initializeNotice, getAllNotice, createNotice } from '../../modules/notice';

import CommunityTemplate from '../../components/community/CommunityTemplate';

const CommunityContainer = ({ match }) => {
    const { page } = match && match.params;
    const etcData = {
        subjectData:
            page === 'cs'
                ? [
                      { name: '번호', width: '12.5%' },
                      { name: '제목', width: '50%' },
                      { name: '작성자', width: '12.5%' },
                      { name: '날짜', width: '15%' },
                      { name: '조회', width: '10%' },
                  ]
                : [
                      // notice && ''
                      { name: '번호', width: '15%' },
                      { name: '제목', width: '70%' },
                      { name: '작성자', width: '15%' },
                  ],
        pageName: page === 'cs' ? '고객센터' : '공지사항',
    };

    const dispatch = useDispatch();
    const { qaStatus, noticeStatus } = useSelector(({ qa, notice }) => {
        return {
            qaStatus: qa.qaStatus,
            noticeStatus: notice.noticeStatus,
        };
    });

    const onCreateNotice = () => {
        dispatch(createNotice({userId: 1, subject: "공지테스트", content: "테스트좀해여"}));
    };

    useEffect(() => {                
        if (page === 'cs') {
            dispatch(initializeQA());
            dispatch(getProductQA({ productId: 0 /* 0일 경우 전부 불러옴 */ }));
        } else {
            dispatch(initializeNotice());
            dispatch(getAllNotice());
        }
    }, [dispatch, page]);


    const events = {
        onCreateNotice,
    }

    
    return (
        <CommunityTemplate
            etcData={etcData}
            data={(page === 'cs') ? qaStatus && qaStatus.data : noticeStatus && noticeStatus.data}
            events = {events}
        />
    );
};

export default withRouter(CommunityContainer);
