import React from 'react';
import queryString from 'query-string';

const ShoppingPage = (props) => {
    const {location, match} = props;
    const {params} = match;        
    const query = queryString.parse(location.search);

    return (
        <> 
                <div>
                    <p>category: {params.category}</p>
                    {params.subcategory && 
                        <p>subcategory: {params.subcategory}</p>}
                    {query.itemId && 
                        <p>query.itemId: {query.itemId}</p>}
                </div>   
            </>
    );
};

export default ShoppingPage;