import client from './client';

// 리뷰 생성
export const createReview = ({userid, categoryId, productId, subject, content, picture, rate}) => {    
    return client.post('/api/review/create', {userid, categoryId, productId, subject, content, picture, rate});
};