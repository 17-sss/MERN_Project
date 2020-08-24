import React from 'react';
import SwipeForm from '../../containers/main/SwipeForm';
import SwipeItem from '../../containers/main/SwipeItem';

const SwipeTemplate = () => {
    return (
        <SwipeForm>
            <SwipeItem onClick={() => alert('no')}>
              slide n°1
            </SwipeItem>
            <SwipeItem
                to="/123"
                backgroundImage={'https://unsplash.it/476/205'}
            >
                slide n°2
            </SwipeItem>
            <SwipeItem
                to="/Shopping/@Test"
                backgroundImage={'https://unsplash.it/477/205'}
            >
                slide n°3
            </SwipeItem>
        </SwipeForm>
    );
};

export default SwipeTemplate;
