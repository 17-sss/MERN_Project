import React from 'react';
// import styled from 'styled-components';
import SwipeForm from '../../containers/main/SwipeForm';

// const SwipeTemplateBlock = styled.div``;

const styles = {
    tabs: {
      background: '#fff',
    },
    slide: {
      padding: 15,
      minHeight: 100,
      color: '#fff',
    },
    slide1: {
      backgroundColor: '#FEA900',
    },
    slide2: {
      backgroundColor: '#B3DC4A',
    },
    slide3: {
      backgroundColor: '#6AC0FF',
    },
  };

const SwipeTemplate = () => {
    return (
        <SwipeForm>
            <div style={Object.assign({}, styles.slide, styles.slide1)}>
                slide n°1
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide2)}>
                slide n°2
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide3)}>
                slide n°3
            </div>
        </SwipeForm>
    );
};

export default SwipeTemplate;
