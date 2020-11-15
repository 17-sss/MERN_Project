import React from 'react';
import { withRouter } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';

import WriteTemplate from '../../components/write/WriteTemplate';

const WriteContainer = (props) => {    
    console.log(props)
    return (
        <WriteTemplate/>
    );
};

export default withRouter(WriteContainer);
