import mongoose from 'mongoose';
import config from 'config'
import logger from './logger'

const NAMESPACE = "Server";

const connect = async () => {
    try {
        await mongoose.connect(config.get<string>('mongo.DBURL'), config.get<{}>('mongo.option'));
        logger.info("DB connected")
    } catch(error) {
        logger.error(NAMESPACE, "Could not connect to db", error);
        process.exit(1);
    }
};


export default connect;