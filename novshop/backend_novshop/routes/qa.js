// qa ******************************************************
import express from "express";
import {QA, User} from "../models";

const router = express.Router();

// Q&A 생성 (POST /api/qa/create)
router.post('/create', async(req, res) => {
    const { userId, productId, subject, content, picture } = req.body;

    try {
        const createQA = await QA.create({
            userId, productId, subject, content, picture
        });

        return res.status(200).json({
            error: null,
            success: true,
            data: createQA,
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


// 상품 Q&A 가져오기 (POST /api/qa/getProductQA)
router.post("/getProductQA", async(req, res) => {
    const {productId} = req.body;

    try {
        const getProductQA = await QA.findAll({where: {productId}});
                
        return res.status(200).json({
            error: null,
            success: true,
            data: getProductQA,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error,
            code: -1,
            message: "서버에 오류가 있습니다.",
        });
    }
});

export default router;