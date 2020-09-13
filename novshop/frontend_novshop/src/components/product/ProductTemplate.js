import React from 'react';
import ProductForm from "./frProduct/ProductForm";
import ProductItem from "./frProduct/ProductItem";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ itemLink값은 임시임

const ProductTemplate = () => {
    // [1] 여기에 데이터 조회하여 배열로 가져옴.
    return (    
        <ProductForm>
            {/* [2] 위에서 가져온 배열을 여기서 map형식으로 렌더. (ProductItem에 정보 넣기.) */}
            <ProductItem
                itemImage = "/images/bymono_test1.webp"
                itemName = "메르첼 오버셔츠"
                // eslint-disable-next-line                
                itemLink = {"/shopping/shirt/0" + "?itemId=0"}
                itemSize = {["XL", "2XL", "3XL", "4XL"]}
                itemColors = {["navy", "skyblue", "gray"]}
                price = {30000}
                sale = {0}
                description = "구김없고 가벼워 매일찾아질거에요!"
            />

            <ProductItem
                itemImage = "/images/bymono_test2.webp"
                itemName = "포켓 배색 긴팔티"
                // eslint-disable-next-line                
                itemLink = {"/shopping/tshirt/0" + "?itemId=1"}
                itemSize = {["XL", "2XL", "3XL", "4XL"]}
                itemColors = {["green", "black", "blue", "white"]}
                price = {22000}
                sale = {0}
            />

            
            <ProductItem
                itemImage = "/images/bymono_test3.webp"
                itemName = "모노 탄탄한 7부티"
                // eslint-disable-next-line                
                itemLink = {"/shopping/tshirt/3" + "?itemId=2"}
                itemSize = {["M-L", "XL", "2XL", "3XL"]}
                itemColors = {["navy", "black", "beige", "white"]}
                price = {29900}
                sale = {19900}
                description = "탄탄한 원단에 달라붙지 않아 쾌적한 착용감 모던한 4color로 데일리 하게 입어보세요."
            />

            <ProductItem
                itemImage = "/images/bymono_test4.gif"
                itemName = "펠로트 트렌치코트"
                // eslint-disable-next-line                
                itemLink = {"/shopping/outer/2" + "?itemId=3"}
                itemSize = {["XL", "2XL", "3XL", "4XL"]}
                itemColors = {["beige", "black"]}
                price = {135000}
                sale = {0}
            />
                        
        </ProductForm>        
    );
};

export default ProductTemplate;

