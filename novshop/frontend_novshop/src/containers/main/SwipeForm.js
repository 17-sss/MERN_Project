import React, { useReducer } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

function reducer(state, action) {
    switch (action.type) {
        case 'NEXT': {
            if (state.value === state.childrenCount - 1) {
                return {
                    ...state,
                    value: 0,
                };
            } else {
                return {
                    ...state,
                    value: state.value + 1,
                };
            }
        }
        case 'PREV': {
            if (state.value === 0) {
                const childCnt = state.childrenCount;
                return {
                    ...state,
                    value: (childCnt-1),
                };
            } else {
                return {
                    ...state,
                    value: state.value - 1,
                };
            }
        }
        case 'AUTO': {
            if (state.value < state.childrenCount - 1) {
                return {
                    ...state,
                    value: state.value + 1,
                };
            } else {
                return {
                    ...state,
                    value: 0,
                };
            }
        }

        default:
            return state;
    }
}
const AutoSwipeViews = autoPlay(SwipeableViews);

const SwipeForm = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {
        value: 0,
        childrenCount: React.Children.count(children),
    });

    return (
        <>
            <AutoSwipeViews
                // enableMouseEvents
                index={state.value}
                onChangeIndex={() => dispatch({ type: 'AUTO' })}
                interval={3000}
            >
                {children}
            </AutoSwipeViews>

            <button onClick={() => dispatch({ type: 'PREV' })}>PREV</button>
            <button onClick={() => dispatch({ type: 'NEXT' })}>NEXT</button>
        </>
    );
};

export default SwipeForm;
