import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import logger from "morgan";        // 로그 모듈
import path from "path";
import passport from "passport";    // passport 모듈
import dotenv from "dotenv";
dotenv.config();                    // 비밀키를 불러오는 모듈 (.env 파일에서 불러옴)

import apiRouter from "./routes/";

import { sequelize } from "./models";           // 시퀄라이즈 모델 서버에 연결..1
import passportConfig from "./passport";        // passport 설정..1

const app = express();
sequelize.sync();               // 시퀄라이즈 모델 서버에 연결..2
passportConfig(passport);       // passport 설정..2

app.set('port', process.env.PORT || 4000);          // 환경변수 포트에 아무것도 없으면 4000으로 지정

app.use(logger('dev'));
// ? 정적파일 제공을 어디서해야할까..
// 추후 참고: https://jeonghwan-kim.github.io/2018/08/19/express-travis-beanstalk.html
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));   // 비밀키(.env의 COOKIE_SECRET 불러옴)
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
        },
    }),
);

// passport 관련 설정은 req.session 객체가 express-session에서 생성하므로 express-session 미들웨어보다 뒤에 선언해야함.
app.use(passport.initialize());     // passport.initialize(): 요청 (req 객체)에 passport 설정을 심음.
app.use(passport.session());        // passport.session(): req.session 객체에 passport 정보를 저장


app.use('/api', apiRouter);

app.use((req, res, next) => {
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

// listen
app.listen(app.get('port'), () => {
    console.log(`http://localhost:${app.get('port')}/`);
});
