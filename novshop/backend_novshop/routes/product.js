// PRODUCT ******************************************************
import { Router } from 'express';
import { Product } from '../models';

const router = Router();

// 상품 데이터 생성 (POST /api/product/create)
router.post('/create', async (req, res) => {
    const {
        name,
        image,
        sizes,
        colors,
        price,
        sale,
        description,
        categorySub,
        categoryId,
    } = req.body;

    try {
        const createData = await Product.create({
            name,
            image,
            sizes: JSON.stringify(sizes),
            colors: JSON.stringify(colors),
            price,
            sale,
            description,
            categorySub,
            categoryId,
        });        

        return res.status(200).json({
            error: null,
            success: true,
            data: {
                ...createData,
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
