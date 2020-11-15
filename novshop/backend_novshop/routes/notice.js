// notice ******************************************************
import express from 'express';
import { Notice, sequelize, Sequelize } from '../models';

const router = express.Router();

// notice 생성 (POST /api/notice/create)
router.post('/create', async (req, res) => {
    const { userId, subject, content, view } = req.body;

    try {
        const createNotice = await Notice.create({
            userId,
            subject,
            content,
            view,
        });

        return res.status(200).json({
            error: null,
            success: true,
            data: createNotice,
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

// notice 전부 불러옴
router.post('/getall', async (req, res) => {
    try {
        // RAW QUERY
        const query = `            
            SELECT @ROWNUM := @ROWNUM + 1 AS RN, 
            notice.id, notice.subject, notice.content, notice.view, notice.createdAt, notice.updatedAt, notice.deletedAt,
            user.userid AS userDisplayId 
            FROM notices AS notice  
            LEFT OUTER JOIN users AS user ON notice.userId = user.id AND (user.deletedAt IS NULL),
            (SELECT @ROWNUM := 0) TMP
            WHERE (notice.deletedAt IS NULL) ORDER BY RN DESC;
        `;

        const getAllNotice = await sequelize.query(query, {
            replacements:  {},
            type: Sequelize.QueryTypes.SELECT,
            raw: true,
        });

        return res.status(200).json({
            error: null,
            success: true,
            data: getAllNotice,
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
