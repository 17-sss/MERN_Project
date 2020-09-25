import axios from 'axios';
import client, {createAxiosOptions} from './client';


// 로그인
export const login = ({userid, userpwd}) => {    
    return client.post('/api/auth/login', {userid, userpwd});
}

// 회원가입
export const register = async ({userid, userpwd, usernick}) => {    
    let options = createAxiosOptions('POST', '/api/auth/register', {userid, userpwd, usernick});
    let response = await axios(options);    
    return response;    
}
/*
export const register = ({userid, userpwd, usernick}) => {    
    return client.post('/api/auth/register', {userid, userpwd, usernick});
};
*/

// 로그인 체크 
export const usercheck = () => {    
    return client.get('/api/auth/usercheck');
}
