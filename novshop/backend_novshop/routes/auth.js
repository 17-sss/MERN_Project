const express = require('express');
// const passport = require('passport');
const bcrypt = require('bcrypt');
const {User} = require('../models');

const router = express.Router();

// Post 회원가입 (POST /api/auth/register)  
router.post('/register', async (req, res, next) => {
    const { userid, userpwd, usernick } = req.body;    

    try {
        const exUser = await User.find( {where: {userid}} );
        
        if (exUser) {
            // 이미 있는 계정
            res.status(400);
            res.send('이미 가입된 아이디 입니다.');
            console.log(exUser, '1');   // 추후 DELETE
            return false;
        }

        const hash = await bcrypt.hash(userpwd, 12);
        /*
            - bcrypt.hash의 두번째인자:
                pbkdf2의 반복횟수와 비슷한 기능.
                숫자가 커질수록 비밀번호를 알아내기 어려워지며 암호화 시간도 오래걸림.
                ** 12이상을 추천
        */
        await User.create({
            userid,
            userpwd: hash,
            usernick,
        });

        const test = await User.find( {where: {userid}} );  // 추후 DELETE
        console.log(test);  // 추후 DELETE
        return test;        // 추후 DELETE

    } catch (error) {
        console.error(error);
        next(error);
        return false;
    }
}); 

module.exports = router;