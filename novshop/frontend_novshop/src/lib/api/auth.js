import client from './client';

// // 로그인 (예시용)
// export const login = ({userid, userpwd}) => {
//     return client.post('/api/auth/login', {userid, userpwd});
// }

export const test = () => {
    return client.get('/api/');
}