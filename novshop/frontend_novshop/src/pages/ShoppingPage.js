import React from 'react';
import queryString from 'query-string';
import ProductContainer from '../containers/product/ProductContainer';
import ProductDetailContainer from '../containers/product/ProductDetailContainer';

const ShoppingPage = (props) => {
    const { location /* match */ } = props;    
    // 쿼리스트링 가져옴. 여기선 itemId 값 (product의 id 값)   
    const query = queryString.parse(location.search);   
    const bIsDetailView = query.itemId ? true : false;
    
    if (bIsDetailView) {
        const propsTmp = {
            ...props,
            query: query,
        };

        // [1] 상품 상세 정보
        return <ProductDetailContainer {...propsTmp} />;
    } else {
        // [2] 상품 목록 페이지
        return <ProductContainer />;
    }
};

export default ShoppingPage;
