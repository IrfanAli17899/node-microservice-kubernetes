import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
// import apiErrorHandler from '../middlewares/apiErrorHandler';

export default function bootstrap() {
    const app = express()
        .use(cors())
        .use(morgan('dev'))
        .use(express.json())
        .use(express.urlencoded({ extended: false }))
        .use(cookieParser())
        .use((_req, res, next) => { res.locals = {}; next(); })
        // .use(apiErrorHandler);

    return app;
}