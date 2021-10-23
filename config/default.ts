import dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
    dbName: "customer_back",
    // useUnifiedTopology: true,
    // useNewUrlParser: true,
    // socketTimeoutMS: 30000,
    // keepAlive: true,
    // poolSize: 50,
    // autoIndex: false,
    // retryWrites: false,
};
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/customer_back";


const SERVER_PORT = process.env.SERVER_PORT || 1337;

const SERVER = {
    port: SERVER_PORT,
};

const MONGO = {
    dbUri: MONGO_URI,
    option: MONGO_OPTIONS
}

const config = {
    server: SERVER,
    mongo: MONGO
};

export default config;


// const MONGO_USERNAME = process.env.MONGO_USERNAME || "superuser";
// const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "supersecretpassword1";

// export default {
//     port: 1337,
//     dbUri: "mongodb://localhost:27017/customer_back"
// };