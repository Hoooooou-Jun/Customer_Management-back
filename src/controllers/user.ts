import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../schemas/user';
import signJWT from '../functions/signJWT';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    logger.info("Token validated, user authorized");

    return res.status(200).json({
        message: "Authorized"
    });
};

const register = (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body
    User.find({ username }).exec().then((users) => {
        if (users.length) { 
            return res.status(405).json({
                message: 'Exist username'
            })
        }
        else {
            bcryptjs.hash(password, 10, (hashError, hash) => {
                if (hashError) {
                    return res.status(500).json({
                        message: hashError.message,
                        error: hashError
                    });
                }
                const _user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    username,
                    password: hash
                });
        
                return _user.save().then((user) => {
                    return res.status(200).json({
                        user
                    });
                })
                .catch((error) => {
                    return res.status(500).json({
                        message: error.message,
                        error
                    });
                });
            });
        }
    })
};

const login = (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;
    User.find({ username }).exec().then((users) => {
        if (users.length !== 1) {
            return res.status(401).json({
                message:'Unauthorized user'
            });
        }
        bcryptjs.compare(password, users[0].password, (error, result) => {
            if (error) {
                logger.error(error.message)
                return res.status(401).json({
                    message:'Incorrect password'
                });  
            }
            else if (result) {
                signJWT(users[0], (_error, token) => {
                    if (_error) {
                        logger.error("Unable to sign token", _error)
                        return res.status(401).json({
                            message:'Unauthorized token',
                            error: _error
                        });
                    }
                    else if (token) {
                        logger.info(`Login Success '${username}'`)
                        return res.status(200).json({
                            message: 'Authorize Success',
                            token,
                            user: users[0]
                        })
                    }
                });
            }
        })
    }).catch((error) => {
        return res.status(500).json({
            message: error.message,
            error
        });
    });
};

const getAllusers = (req: Request, res: Response, next: NextFunction) => {
    User.find().select('-password').exec().then((users) => {
        return res.status(200).json({
            users,
            count: users.length
        });
    }).catch((error) => {
        return res.status(500).json({
            message: error.message,
            error
        });
    });
};

export default { validateToken, register, login, getAllusers };