import client from './client';

// QA 생성
export const createQA = ({userId, productId, subject, content, picture}) => {        
    return client.post('/api/qa/create', {userId, productId, subject, content, picture});
};

// 상품 QA 가져오기
export const getProductQA = ({productId}) => {        
    return client.post('/api/qa/getProductQA', {productId});
};