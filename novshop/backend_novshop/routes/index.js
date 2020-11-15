// INDEX (루트 라우터) ******************************************************
import express from "express";
import category from "./category";
import auth from "./auth";
import product from "./product";
import review from "./review";
import qa from "./qa";
import notice from "./notice";

const router = express.Router();
router.use('/auth', auth);
router.use('/category', category);
router.use('/product', product);
router.use('/review', review);
router.use('/qa', qa);
router.use('/notice', notice);

export default router;