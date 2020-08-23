import React, {useReducer} from 'react';
import SwipeableViews from 'react-swipeable-views';

function reducer(state, action) {
    switch (action.type) {
        case 'NEXT':
            return {value: state.value + 1};
        case 'PREV':
            return {value: state.value - 1};      
        // case 'INTTERVAL': {
        //     return {
        //         setInterval({
        //             value: state.value - 1;
        //         }
        //         , 3000);
        //     }
        // }
        default:
            return state;
    }
}

const SwipeForm = ({children}) => {
    const [state, dispatch] = useReducer(reducer, {value: 0});

    return (
        <>
            <SwipeableViews
                enableMouseEvents 
                index={state.value}
                onChangeIndex = { () => dispatch({}) }
            >
                {children}
            </SwipeableViews> 

            <button 
                onClick={() => dispatch({ type: 'PREV' })}
            >
                PREV
            </button>  
            <button 
                onClick={() => dispatch({ type: 'NEXT' })}
            >
                NEXT
            </button>      
        </>
        
    );
};

export default SwipeForm;