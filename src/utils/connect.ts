import mongoose from 'mongoose';
import config from '../../config/default'
import logger from './logger'

const connect = async () => {
    try {
        await mongoose.connect(config.mongo.dbUri, config.mongo.option);
        logger.info("DB connected")
    } catch(error) {
        logger.error("Could not connect to db");
        process.exit(1);
    }
};


export default connect;