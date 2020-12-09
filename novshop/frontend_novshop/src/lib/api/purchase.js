import client from './client';

export const cartIn = ({ volume, selcolor, selsize, productId, userId }) => {
    return client.post('/api/purchase/cartIn', {
        volume,
        selcolor,
        selsize,
        productId,
        userId,
    });
};

export const getCart = ({ userId }) => {
    return client.post('/api/purchase/getCart', { userId });
};

export const updCartVolume = ({ id, volume }) => {
    return client.patch('/api/purchase/updCartVolume', { id, volume });
};
