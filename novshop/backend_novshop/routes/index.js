// INDEX (루트 라우터) ******************************************************
import express from "express";
import category from "./category";
import auth from "./auth";
import product from "./product";
import review from "./review";

const router = express.Router();
router.use('/auth', auth);
router.use('/category', category);
router.use('/product', product);
router.use('/review', review);

export default router;