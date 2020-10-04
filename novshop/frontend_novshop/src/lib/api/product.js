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
