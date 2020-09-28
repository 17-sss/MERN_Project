// 루트 라우터
import express from "express";
import category from "./category";
import auth from "./auth";

const router = express.Router();
router.use('/auth', auth);
router.use('/category', category);

export default router;