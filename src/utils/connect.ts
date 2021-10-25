import mongoose from 'mongoose';
import config from 'config'
import logger from './logger'

const connect = async () => {
    try {
        await mongoose.connect(config.get<string>('mongo.DBURL'), config.get<{}>('mongo.option'));
        logger.info("DB connected")
    } catch(error) {
        logger.error("Could not connect to db");
        logger.error(error)
        process.exit(1);
    }
};


export default connect;