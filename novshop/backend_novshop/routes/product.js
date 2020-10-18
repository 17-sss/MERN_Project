// PRODUCT ******************************************************
import { Router } from 'express';
import { Product } from '../models';
import multer from 'multer';
import fs from "fs";
import path from "path";

const router = Router();

// 파일 업로드 관련 START
// 1) 폴더 생성
fs.readdir('uploads', (err) => {
    if (err) {
        console.error('uploads 폴더가 없습니다. 폴더를 생성합니다.')
        fs.mkdirSync('uploads');
    }
});

// 2) multer 설정 (로컬)
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            // cb는 callback이란 뜻
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
        },
    }),
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});
// 파일 업로드 관련 END



// 상품 데이터 생성 (POST /api/product/create)
/*
router.post('/create', upload.single('image'), (req, res) => {
    console.log(req.file);
    res.json({
        error: null,
        success: true,
        data: 'test',
    })
});
*/
// https://velog.io/@nomadhash/TIL-multer를-이용한-이미지-업로드-feat.React-x-Node-js 참고해보기..

router.post('/create', upload.single('image'), async (req, res) => {
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
    
    if (!req.file || !req.files) {        
        return res.status(500).json({            
            error: ('req.file: ' + req.file + ' // ' + 'req.files: ' + req.files), 
            code: -2,
            message: '이미지 파일 업로드 오류',
        });
    } else {
        console.log(req.file)
    }


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
