import axios from 'axios';

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
    // formData.set('enctype','multipart/form-data');
    formData.append('name', name);
    formData.append('image', image);
    formData.append('sizes', sizes);
    formData.append('colors', colors);
    formData.append('price', price);
    formData.append('sale', sale);
    formData.append('description', description);
    formData.append('categorySub', categorySub);
    formData.append('categoryId', categoryId);
    /* 
    return fetch ( "/api/product/create",  { 
        method : "POST" , 
        body : formData 
    });
    */
   
    return axios({
        method: 'post',
        url: '/api/product/create',
        data: formData,
        headers: {
            'content-type': 'multipart/form-data',
        },
    });    
};

// bak 201017_2250
/*
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
    return client.post('/api/product/create', {
        name,
        image,
        sizes,
        colors,
        price,
        sale,
        description,
        categorySub,
        categoryId,
    });
};
*/
