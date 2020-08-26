import React from 'react';
import SwipeForm from './Swipe/SwipeForm';
import SwipeItem from './Swipe/SwipeItem';

const SwipeTemplate = () => {
    return (
        <SwipeForm>
            <SwipeItem
                to="/Shopping/@SWIPE1"
                imageLink="/images/200810.jpg"                                               
            >
                slide n°1
            </SwipeItem>
            <SwipeItem
                to="/Shopping/@SWIPE2"
                imageLink="/images/200730.jpg" 
            >
                slide n°2
            </SwipeItem>
            <SwipeItem
                to="/Shopping/@SWIPE3"
                imageLink="/images/200720.jpg"
                // imageLink="https://unsplash.it/477/205"
            >
                <div style={{ backgroundColor: 'red' }}>slide n°3</div>
            </SwipeItem>
        </SwipeForm>
    );
};

export default SwipeTemplate;
