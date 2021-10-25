import { Request, Response, NextFunction} from 'express';
import logging from '../utils/logger';
import config from 'config';
import jwt from 'jsonwebtoken';

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
    logging.info('Validating Token');

    let token = req.headers.authorization?.split(' ')[1];
    
    if (token) {
        jwt.verify(token, config.get<string>('server.token.SECRET'), (error, decoded) => {
            if (error) {
                return res.status(404).json({
                    message: error.message,
                    error
                });
            }
            else {
                res.locals.jwt = decoded;
                next();
            }
        });
    }
    else {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};

export default extractJWT;