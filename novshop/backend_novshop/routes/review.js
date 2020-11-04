// CATEGORY ******************************************************
import express from "express";
import {Review} from "../models";

const router = express.Router();

// 리뷰 생성 (POST /api/review/create)
router.post('/create', async(req, res) => {
    const { userid, categoryId, productId, subject, content, picture, rate } = req.body;
    
    try {
        const createReview = await Review.create({
            userid, categoryId, productId, subject, content, picture, rate
        });

        return res.status(200).json({
            error: null,
            success: true,
            data: {
                subject: createReview.subject,
                content: createReview.content,
            },
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

export default router;