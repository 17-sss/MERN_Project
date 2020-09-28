import React from 'react';
import { createCategory } from '../lib/api/category';

const MemberPage = () => {
    return (
        <div>
            This is MemberPage.
            <button
                // onclick={createCategory({
                //     key: "community",
                //     value: "",
                //     items: `
                //         "id": "0", "key": "notice", "value": "공지사항"
                //         |
                //         "id": "1", "key": "cs", "value": "고객센터"
                //     `
                    
                // })}
            >
                클릭
            </button>
        </div>
    );
};

export default MemberPage;
