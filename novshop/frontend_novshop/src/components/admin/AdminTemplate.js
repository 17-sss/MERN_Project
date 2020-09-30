import React from "react";
import styled from "styled-components";
import { getSize } from "../../lib/utility/customFunc";

const AdminWrapper = styled.div`
    width: ${getSize(1)};
    margin: 0 auto;
`;

const AdminTemplate = (props) => {
    const {createCategories} = props;

    return (
        <>
            <AdminWrapper>
                <button onClick = {createCategories}>
                    카테고리 리스트 생성 
                </button>
                <br/>
                {/*
                <button onClick = {getCategories}>
                    카테고리 리스트 생성 
                </button>
                */}
            </AdminWrapper>
        </>
    )
};

export default AdminTemplate;