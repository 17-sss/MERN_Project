import client from './client';


// 카테고리 생성
export const createCategory = ({key, displayValue, items}) => {    
    return client.post('/api/category/create', {key, displayValue, items});
};