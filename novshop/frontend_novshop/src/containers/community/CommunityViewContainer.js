import React from 'react';
import { withRouter } from 'react-router-dom';
import CommunityViewTemplate from '../../components/community/CommunityViewTemplate';

const CommunityViewContainer = (props) => {
    const { num, match, location } = props;
    const {pathname, search} = location;
    const { page } = match.params;    
    const pageName = page === 'cs' ? '고객센터' : '공지사항';

    const etcDatas = {
        num,
        page,
        pageName,
        thisLocation: (pathname + search),
    };
    console.log(props)

    return <CommunityViewTemplate etcDatas={etcDatas} />;
};

export default withRouter(CommunityViewContainer);
