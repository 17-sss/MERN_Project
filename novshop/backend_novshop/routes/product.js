// PRODUCT ******************************************************
import { Router } from 'express';
import { Product } from '../models';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import category from '../models/category';

const router = Router();

// 파일 업로드 관련 START -------------
// 1) 폴더 생성
fs.readdir('../frontend_novshop/public/uploads', (err) => {
    // fs.readdir('uploads', (err) => {     //  bak, 백앤드기반 디렉토리
    if (err) {
        console.error('uploads 폴더가 없습니다. 폴더를 생성합니다.');
        fs.mkdirSync('../frontend_novshop/public/uploads');
    }
});

// 2) multer 설정 (로컬)
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            // cb는 callback이란 뜻
            cb(null, '../frontend_novshop/public/uploads/');
            // cb(null, 'uploads/');    //  bak, 백앤드기반 디렉토리
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(
                null,
                path.basename(file.originalname, ext) +
                    new Date().valueOf() +
                    ext,
            );
        },
    }),
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});
// 파일 업로드 관련 END -------------

// 상품 생성
router.post('/create', upload.single('image'), async (req, res) => {
    const {
        name,
        // image,
        sizes,
        colors,
        price,
        sale,
        description,
        categorySub,
        categoryId,
    } = req.body;

    if (!req.file) {
        res.statusMessage = 'IMAGE UPLOAD ERROR';
        return res.status(512).json({
            error: 'req.file: ' + req.file,
            bodyStatus: req.body,
            code: -2,
            message: '이미지 파일 업로드 오류',
        });
    }

    // formData로 받아오니 (sizes, colors) string으로 변환되어 옴.
    // 그러므로 다시 배열로 변환 후 작업.
    let encSize = sizes.split(',');
    let encColors = colors.split(',');

    try {
        const createData = await Product.create({
            name,
            image: req.file.filename,
            sizes: JSON.stringify(encSize),
            colors: JSON.stringify(encColors),
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

// 상품 목록 전부 불러오기
router.post('/getAll', async (req, res) => {
    try {
        const allProduct = await Product.findAll();

        if (!allProduct) {
            res.statusMessage = 'PRODUCT_LIST IS NULL.';

            return res.status(452).json({
                error: 'PRODUCT_LIST IS NULL.',
                code: 1,
                message: '상품 전체 목록을 불러올 수 없습니다.',
            });
        }

        return res.status(200).json({
            error: null,
            success: true,
            data: allProduct,
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

// 상품 불러오기
router.get('/get', async (req, res) => {
    const { id, categorySub, categoryId } = req.query; // (쿼리스트링의 값. products db 기반)
    let errMsg = '';

    if (!id) {
        errMsg = 'PRODUCT_ID IS NULL'
        res.statusMessage = errMsg;

        return res.status(453).json({
            error: errMsg,
            code: 1,
            message: '상품의 ID가 없어 정보 불러올 수 없습니다.',
        });
    }

    try {
        let where = {id: id};    

        if (categoryId) {
            if (categorySub)
                where = {...where, categoryId: categoryId, categorySub: categorySub}
            else 
                where = {...where, categoryId: categoryId}
        } else {            
            if (categorySub) {
                errMsg  ='Unable to search with key (categorySub)';
                res.statusMessage = errMsg;

                return res.status(453).json({
                    error: errMsg,
                    code: 2,
                    message: '상품의 categorySub만 가지고 값을 검색할 순 없습니다.',
                })
            }
        }        

        const product = await Product.findOne({
            where: where,
            attributes: {
                // exclude는 제외할 필드 설정. exclude 안쓰고 그냥 딱! 배열만 놓을땐 표시할 필드 설정
                exclude: ['createdAt', 'deletedAt', 'updatedAt', 'id'],
            },
        });

        if (!product) {
            errMsg = 'PRODUCT IS NULL';
            res.statusMessage = errMsg;

            return res.status(453).json({
                error: errMsg,
                code: 3,
                message: '상품 정보 불러올 수 없습니다.',
            });
        }

        return res.status(200).json({
            error: null,
            success: true,
            data: product,
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
