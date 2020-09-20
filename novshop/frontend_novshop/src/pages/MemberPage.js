import React from 'react';
import * as authAPI  from '../lib/api/auth';

const MemberPage = () => {
    React.useEffect( () => {
        console.log(authAPI.test());
    })

    return (
        <div>
            This is MemberPage.
        </div>
    )
};

export default MemberPage;