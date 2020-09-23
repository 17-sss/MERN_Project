// 루트 라우터
import express from "express";
import auth from "./auth";

const router = express.Router();
router.use('/auth', auth);

export default router;