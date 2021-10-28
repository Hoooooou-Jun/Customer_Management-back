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
    console.log(req.body)
    let { id, password } = req.body
    //if ( id === "" && password === "" && username === "" &&& phone )

    User.find({ id }).exec().then((users) => {
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
                else {
                    const _user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        id,
                        password: hash,
                        username: "정보 없음",
                        phone: "정보 없음",
                        region: "정보 없음",
                    });
                    return _user.save().then((user) => {
                        return res.status(200).json({
                            user
                        });
                    })
                }
                // .catch((error) => {
                //     return res.status(500).json({
                //         message: error.message,
                //         error
                //     });
                // });
            });
        }
    })


};

const login = (req: Request, res: Response, next: NextFunction) => {
    let { id, password } = req.body;
    User.find({ id }).exec().then((users) => {
        if (users.length !== 1) {
            return res.status(401).json({
                message: 'Unauthorized user' 
            })
        }
        bcryptjs.compare(password, users[0].password, (error, result) => {
            if (result == false) {
                return res.status(401).json({
                    message: 'Incorrect password' 
                })
            }
            else if (result) {
                signJWT(users[0], (_error, token) => {
                    if (_error) {
                        logger.error("Unable to sign token", _error)
                        return res.status(401).json({
                            message: 'Unauthorized token'
                        });
                    }
                    else if (token) {
                        logger.info(`Login Success '${id}'`)
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

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
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

const editUserInfo = (req: Request, res: Response, next: NextFunction) => {
    let { id, password, username, phone, region} = req.body;
    User.updateOne({ id }, {"$set": {
        password: password,
        username: username,
        phone: phone,
        region: region
    }}).then((response) => {
        return res.status(200).json({
            response
        })
    }).catch((error) => {
        console.log(error)
    })
}

export default { validateToken, register, login, getAllUsers, editUserInfo };