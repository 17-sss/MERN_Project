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


// 장바구니 수량 업데이트 (PATCH /api/purchase/updCartVolume)
router.patch("/updCartVolume", async(req, res) => { 
    const {id, volume} = req.body;

    try {
        const updCartVolume = await ShoppingCart.update({volume}, { where: { id } });
        
        return res.status(200).json({
            error: null,
            success: true,      
            data: updCartVolume,
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