import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Hello from '../schemas/hello';

const createMainData = (req: Request, res: Response, next: NextFunction) => {
    let { name, info } = req.body;

    const hello = new Hello({
        _id: new mongoose.Types.ObjectId(),
        name,
        info,
    });

    return hello.save().then((response) => {
        return res.status(201).json({
            hello: response
        });
    }).catch((error) => {
        message: error.message,
        error
    })
};


const getMainData = (req: Request, res: Response, next: NextFunction) => {
    Hello.find().exec().then((response) => {
        return res.status(200).json({
            data: response,
            count: response.length
        });
    }).catch((error) => {
        message: error.message,
        error
    });
};

export default { createMainData, getMainData };