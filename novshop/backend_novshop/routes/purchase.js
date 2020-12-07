// 장바구니(ShoopingCart), 구매(Buy) 모델 쓰임
import express from "express";
import { ShoppingCart, Product } from "../models";

const router = express.Router();

// 장바구니 담기 (POST /api/purchase/cartIn)
router.post("/cartIn", async(req, res) => {
    const {        
        volume, selcolor, selsize, productId, userId
    } = req.body;
    
    if (!userId || !productId) {                
        return res.status(460).json({
            error: 'USERID OR PRODUCTID IS NULL',
            code: 1,
            message: !userId
                ? '유저 정보가 존재하지 않습니다.'
                : !productId
                ? '상품 정보가 존재하지 않습니다.'
                : !productId && !userId && '유저, 상품 정보가 존재하지 않습니다.',
        });
    }

    try {
        const duplicateCheck = await ShoppingCart.findOne({
            where: {selcolor, selsize, productId, userId,}
        });

        if (duplicateCheck) {
            // 중복O: 수량만 변경
            const { volume: currentVol, id } = duplicateCheck;

            const updateVolCart = await ShoppingCart.update(
                { volume: Number(currentVol + volume) },
                { where: { id } },
            );

            return res.status(200).json({
                error: null,
                success: true,
                data: updateVolCart,
            });
        } else {
            // 중복X: 장바구니에 담음
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
        }

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
    -- 201207_1557: 2)번 상황 cartIn에서 처리.
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

// 장바구니 (유저에 따른) 정보 가져오기  (POST /api/purchase/getCart)
router.post("/getCart", async(req, res) => {
    const { userId } = req.body;
    try {
        const getCart = await ShoppingCart.findAll({
            where: { userId },      
            attributes: { 
                // 제외될 필드 목록 (exclude옵션 안쓰고 그냥 쓰면 보여질 필드 목록.)
                exclude: ['createdAt', 'deletedAt', 'updatedAt'] 
            },      
            // JOIN (Product 테이블)
            include: [  
                {                    
                    model: Product,
                    attributes: ['name', 'image', 'sizes', 'price', 'sale', 'mileage', 'categoryId', 'categorySub'],
                },
            ],
        });

        return res.status(200).json({
            error: null,
            success: true,
            data: getCart,
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error,
            code: -1,
            message: '서버에 오류가 있습니다.',
        });
    }
});


export default router;