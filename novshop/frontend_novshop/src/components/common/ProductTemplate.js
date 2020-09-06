import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { getSize } from '../../lib/utility/customFunc';

const BootstrapContainer = styled(Container)`
    width: ${getSize(1.2)};
    max-width: none !important;
`;

const BootstrapCol = styled(Col)`
    background-color: ${(props) => props.backcolor || 'black'};
    height: 400px;
    width: 400px;
    margin: 0;
    padding: 0;
    border: 1px solid black;
`;


const ProductTemplate = (props) => {
    const Items = () => {
        let arr = [];

        for (let index = 0; index <= 7; index++) {
            arr.push(
                <BootstrapCol 
                    backcolor="#ccc" 
                    key = {index}
                    
                    /*className = "col-xs-4"*/
                >
                    <div
                        style={{
                            height: '290px',
                            marginTop: '10px',
                            backgroundColor: '#fff',
                        }}
                    />
                    <div style = {{margin: '5px 0'}} />
                    <div
                        style={{
                            height: '90px',                            
                            backgroundColor: "rgb(240 , 240, 240)",
                        }}
                    >
                        몇번쨰일까? :: {index + 1}
                    </div>
                    
                </BootstrapCol>
            );                            
        }

        return arr;
    }

    

    return (
        <BootstrapContainer /*fluid*/>
            <Row className="row-cols-4" style={{ margin: '0 10%' }}>
                {
                    Items().map( (value, i) => {
                        return value
                    })
                }
            
            </Row>
        </BootstrapContainer>
    );
};

export default ProductTemplate;
