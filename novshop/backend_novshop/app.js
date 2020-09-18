const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');   // 로그 모듈
const path = require('path');
require('dotenv').config();         // 비밀키를 불러오는 모듈 (.env 파일에서 불러옴)

// [필요없는] 모듈
/*
// 웹 브라우저에 메세지 표시해주는건데 필요없음.    ( https://backback.tistory.com/340 )
const flash = require('connect-flash');     
*/

const authRouter = require('./routes/auth');
const app = express();

app.set('port', process.env.PORT || 4000); // 환경변수 포트에 아무것도 없으면 4000으로 지정

// [필요없는] 설정 : set
/*
// front는 리액트쓸거임.
app.set('views', path.join(__dirname,'views'));
app.set('view engine','pug');
*/


app.use(logger('dev'));
// ? 정적파일 제공을 어디서해야할까.. 
// 추후 참고: https://jeonghwan-kim.github.io/2018/08/19/express-travis-beanstalk.html
app.use(express.static(path.join(__dirname, 'public')));    
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));   // 비밀키(.env의 COOKIE_SECRET 불러옴)
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));

app.use('/auth', authRouter);

app.use((req,res,next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen( app.get('port'), () => {
    console.log(`http://localhost:${app.get('port')}/`);
});