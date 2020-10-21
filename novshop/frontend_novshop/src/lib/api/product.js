import client from './client';

export const createProduct = ({
    name,
    image,
    sizes,
    colors,
    price,
    sale,
    description,
    categorySub,
    categoryId,
}) => {    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('sizes', sizes);
    formData.append('colors', colors);
    formData.append('price', price);
    formData.append('sale', sale);
    formData.append('description', description);
    formData.append('categorySub', categorySub);
    formData.append('categoryId', categoryId);

    return client.post('/api/product/create', formData);
};

export const getAllProduct = () => {
    return client.post('/api/product/getall');
}