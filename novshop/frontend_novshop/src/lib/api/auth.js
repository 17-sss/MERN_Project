import axios from 'axios';
import client, {createAxiosOptions} from './client';


// 로그인
export const login = ({userid, userpwd}) => {    
    return client.post('/api/auth/login', {userid, userpwd});
}

// 회원가입
export const register = async ({userid, userpwd, username, address, phonenumber, email}) => {    
    let options = createAxiosOptions('POST', '/api/auth/register', {userid, userpwd, username, address, phonenumber, email});
    let response = await axios(options);    
    return response;    
}
/*
export const register = ({userid, userpwd, username}) => {    
    return client.post('/api/auth/register', {userid, userpwd, username});
};
*/

// 로그인 체크 
export const usercheck = () => {    
    return client.get('/api/auth/usercheck');
}

// 로그아웃
export const logout = () => {    
    return client.post('/api/auth/logout');
}

