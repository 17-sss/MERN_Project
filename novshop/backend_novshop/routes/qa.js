// qa ******************************************************
import express from "express";
import {QA, User, Sequelize, sequelize} from "../models";

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
        // RAW QUERY VER, 일반은 백업본 참고 (201110_1503_qa)
            // ROWNUM 사용하기위해 RAW QUERY 연구함. 
        const query = `
            SELECT @ROWNUM := @ROWNUM + 1 AS RN, 
            qa.id, qa.subject, qa.content, qa.picture, qa.dateinfo, qa.view, qa.createdAt, qa.updatedAt, qa.deletedAt, qa.userId, qa.productId, 
            user.userid AS userDisplayId
            FROM qas AS qa
            LEFT OUTER JOIN users AS user ON qa.userId = user.id AND (user.deletedAt IS NULL), 
            (SELECT @ROWNUM := 0) TMP
            WHERE (qa.deletedAt IS NULL AND qa.productId = :productId) ORDER BY RN DESC;
        `;

        const getProductQA = await sequelize.query(
            query, 
            {
                replacements: {productId}, 
                type: Sequelize.QueryTypes.SELECT, 
                raw: true
            }
        );
         
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