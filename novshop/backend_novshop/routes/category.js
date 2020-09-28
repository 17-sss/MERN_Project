import express from "express";
import {Category} from "../models";

const router = express.Router();

// 로그인 (POST /api/category/create)
router.post('/create', async (req, res) => {
    const { key, displayValue, items } = req.body;

    try {
        const exCategory = await Category.findOne({ where: { key } });

        if (exCategory) {
            return res.status(401).json({
                error: 'CATEGORY EXISTS',
                code: 1,
                message: '이미 존재하는 카테고리입니다.',
            });
        }

        await Category.create({
            key,
            displayValue,
            items,
        });
        
        return res.status(200).json({
            error: null,
            success: true,
        });

    } catch (error) {        
        console.error(error);        
        return res.status(500).json({
            error: 'UNKNOWN ERROR',
            code: -1,
            message: '서버에 오류가 있습니다.',
        });
    }
});


export default router;