import React, { useState } from 'react';
import TestTemplate from '../../components/test/TestTemplate';
import axios from 'axios';

const TestContainer = () => {
    const [state, setState] = useState(null);

    const onChange = (e) => {
        setState(e.target.files[0]);
    };

    const onSubmit = () => {
        const formData = new FormData();

        formData.append('name', 'test');
        formData.append('image', state);
        formData.append('sizes', []);
        formData.append('colors', []);
        formData.append('price', 1000);
        formData.append('sale', 0);
        formData.append('description', '');
        formData.append('categorySub', 0);
        formData.append('categoryId', 1);

        return axios
            .post('/api/product/create', formData)
            .then((res) => {
                alert('성공');
            })
            .catch((err) => {
                alert('실패');
            });
    };

    return <TestTemplate onSubmit={onSubmit} onChange={onChange} />;
};

export default TestContainer;
