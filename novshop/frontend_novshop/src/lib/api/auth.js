import client from './client';

// 로그인
export const login = ({userid, userpwd}) => {
    return client.post('/api/auth/login', {userid, userpwd});
}

// 회원가입
export const register = ({userid, userpwd, usernick}) => {
    return client.post('/api/auth/register', {userid, userpwd, usernick});
};

// 로그인 체크 
export const usercheck = () => {
    return client.get('/api/auth/usercheck');
}