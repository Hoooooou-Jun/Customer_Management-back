import jwt from 'jsonwebtoken';
import config from 'config';
import logger from '../utils/logger';
import IUser from '../interfaces/user';

const signJWT = (user: IUser, callback: (error: Error | any, token : string | null) => void): void => {
    let timeSinceEpoch = new Date().getTime();
    let expirationTime = timeSinceEpoch + Number(config.get<number>('server.token.EXPIRENTTIME')) * 100000;
    let expirationTimeInSeconds = Math.floor(expirationTime / 1000);

    logger.info(`Attempting to sign token for ${user.id}`);

    try {
        jwt.sign(
            {
                id: user.id
            },
            config.get<string>('server.token.SECRET'),
            {
                issuer: config.get<string>('server.token.ISSUER'),
                algorithm: 'HS256',
                expiresIn: expirationTimeInSeconds,
            },
            (error, token) => {
                if (error) {
                    callback(error, null);
                }
                else if (token) {
                    callback(null, token);
                }
            }
        );
    } catch (error) {
        logger.error(error);
        callback(error, null);
    }
};

export default signJWT;