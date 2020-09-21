import React from 'react';
import * as authAPI  from '../lib/api/auth';

const MemberPage = () => {
    React.useEffect( () => {
        // 추후 DELETE
        console.log(authAPI.register({userid: 'paw', userpwd: '123', usernick: 'nick'}));
    })

    return (
        <div>
            This is MemberPage.
        </div>
    )
};

export default MemberPage;