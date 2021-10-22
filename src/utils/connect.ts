import mongoose from 'mongoose';
import config from 'config'
import logger from './logger'

const connect = async () => {
    const DBURI = config.get<string>("dbUri");
    try {
        await mongoose.connect(DBURI);
        logger.info("DB connected")
    } catch(error) {
        logger.error("Could not connect to db");
        process.exit(1);
    }
};

export default connect;