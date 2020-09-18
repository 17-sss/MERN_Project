// routes :: auth 
const express = require('express');
const router = express.Router();

// 테스트용. 
router.get('/login', (req, res) => {
    console.log(req, '123');
    res.send('<div>123</div>');
    // 음.. 무식하게 auth/login 가도 별반응없네
    // axios를 front에서 설정해줘야하나
    // 뭐지 어떻게해야..?
}); 

module.exports = router;