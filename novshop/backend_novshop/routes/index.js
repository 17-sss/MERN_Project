// index
const express = require('express');
const router = express.Router();

// 테스트용. 
router.get('/', (req, res) => {
    res.send(    {
        id: 2,
        key: "new",
        value: "NEW 5%",
        items: []
    },);
}); 

module.exports = router;