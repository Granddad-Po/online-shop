import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
const {SECRET} = require('../../../config');


@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(401).json({message: 'Пользователь не авторизован'})
            }
            const decoded = jwt.verify(token, SECRET);
            // @ts-ignore
            req.user = decoded
            next()
        } catch (e) {
            res.status(401).json({message: 'Пользователь не авторизован'})
        }
        next();
    }
}
