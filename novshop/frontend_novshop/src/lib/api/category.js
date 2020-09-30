import client from './client';


// 카테고리 생성
export const insertCategory = ({key, displayValue, items}) => {    
    return client.post('/api/category/create', {key, displayValue, items});
};

// 카테고리 가져오기
export const getCategory = () => {    
    return client.post('/api/category/getall');
};