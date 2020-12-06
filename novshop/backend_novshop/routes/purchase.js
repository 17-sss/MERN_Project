// 장바구니(ShoopingCart), 구매(Buy) 모델 쓰임
import express from "express";
import { ShoppingCart } from "../models";

const router = express.Router();

// 장바구니 담기 (POST /api/purchase/cartin)
router.post("/cartIn", async(req, res) => {
    const {        
        volume, selcolor, selsize, productId, userId
    } = req.body;

    try {
        const createCart = await ShoppingCart.create({
            volume,
            selcolor,
            selsize,      
            productId,
            userId,      
        });

        return res.status(200).json({
            error: null,
            success: true,
            data: createCart,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error,
            code: -1,
            message: '서버에 오류가 있습니다.',
        });
    }
});


// 장바구니 수량 업데이트 (PATCH /api/purchase/cartVolUpdate)
router.patch("/cartVolUpdate", async(req, res) => { 
/*     
    1) 장바구니 창에서 수량을 업데이트 할 경우.
    2) 이미 카트에 같은 상품이 있는데 해당 상품 페이지에서 또 추가할 때. ==> 수량 정보가져와서 상품페이지에서 입력한 수량정보와 ++
    -- 이 두 사항의 flag는 type이란 속성으로 처리하기로. (productId, selcolor, selsize가 같을 경우 --> 2)의 상황임 )
*/
    const {volume} = req.body;
    let {type} = req.body;
    type = type ? type : "";    // 공사중...

    try {
        const cartVolUpdate = await ShoppingCart.update({volume}, { where: { id } });

        return res.status(200).json({
            error: null,
            success: true,      
            data: cartVolUpdate,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error,
            code: -1,
            message: '서버에 오류가 있습니다.',
        });
    }
});

// 장바구니 (유저에 따른) 정보 가져오기  (POST /api/purchase/getCartInfo)
/*
router.post("/getCartInfo", async(req, res) => {
    // name, image, sizes, price, sale, (productId 활용하여 GET)
});
*/

export default router;