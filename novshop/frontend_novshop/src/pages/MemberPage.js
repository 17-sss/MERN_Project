import React from 'react';
import ProfileContainer from "../containers/auth/RegisterContainer";    // ProfileContainer는 RegisterContainer 겸 쓰임.
import MemberContainer from '../containers/member/MemberContainer';
import ErrorContainer from '../containers/error/ErrorContainer';

const MemberPage = (props) => {
    const {
        match: { params },
    } = props;
    const { userid, opt } = params;

    return userid ? (
        opt ? (
            opt === 'profile' ? (
                <ProfileContainer isUpdateForm />
            ) : opt === 'order' ? (
                <div>order</div>
            ) : (
                opt !== 'profile' && opt !== 'order' && <ErrorContainer />
            )
        ) : (
            <MemberContainer />
        )
    ) : (
        <ErrorContainer />
    );
};

export default MemberPage;
