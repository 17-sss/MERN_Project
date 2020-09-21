const express = require('express');
import passport from "passport";
const bcrypt = require('bcrypt');
const {User} = require('../models');

const router = express.Router();

// 로그인 (POST /api/auth/login)  
router.post('/login', (req, res, next) => {
    // 흠... 로그인.. 애매한데
    // 연구해봐야할듯 패스포트로 어케가는건지..
    const {userid, userpwd} = req.body;
    const user = {
        userid: userid,
        userpwd: userpwd,
    }
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            res.status(401);    // Unauthorized :: 없는 계정
            res.send(info.message, '없는 계정입니다.');
            return;
        }
    })
})


// 회원가입 (POST /api/auth/register)  
router.post('/register', async (req, res, next) => {
    const { userid, userpwd, usernick } = req.body;    

    try {
        const exUser = await User.find( {where: {userid}} );
        
        if (exUser) {
            // 이미 있는 계정
            res.status(409);    // Conflict 
            res.send('이미 가입된 아이디 입니다.');  
            return;                      
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
/*
        const test = await User.find( {where: {userid}} );  // 추후 DELETE
        console.log(test);  // 추후 DELETE
        return test;        // 추후 DELETE
*/

    } catch (error) {
        console.error(error);
        next(error);
        return;
    }
}); 

// 로그인 체크 (GET /api/auth/logincheck)  
router.get('/logincheck', (req, res, next) => {
    const {user} = req.session;

    if (!user) {
        // 로그인 중 아님
        res.status(401);   // Unauthorized
        res.send('로그인이 되어있지 않습니다.');
        return;
    }
    return user;

    /*
    if (req.isAuthenticated()) {    
        next();
        // return true;
    } else {
        res.status(401);    // Unauthorized
        res.send('로그인이 되어있지 않습니다.');
        // return false;
    }
    */
});



module.exports = router;