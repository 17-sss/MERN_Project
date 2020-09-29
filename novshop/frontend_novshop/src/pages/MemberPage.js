import React from 'react';
import { createCategory, getCategory } from '../lib/api/category';
import data from '../lib/data/categoryList.json';

const MemberPage = () => {

    const onClick = () => {
        try {
            data.map( (v, i) => {
                console.log(i);
                return createCategory({
                    key: v.key,
                    value: v.value,
                    items: v.items,
                })    
            })
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const onClickLoad = () => {
        let c = getCategory();
        console.log(c);
        // 음... 사가작업 ㄱㄱ 해야할듯
    };
    
    return (
        <div>
            This is MemberPage.
            <button onClick={onClick}>
                클릭
            </button>
            <button onClick={onClickLoad}>
                가져와
            </button>
        </div>
    );
};

export default MemberPage;
