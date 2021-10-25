export default {
    server: {
        PORT: 1337,
        token: {
            EXPIRENTTIME: 3600,
            ISSUER: "coolIssuer",
            SECRET: "superencryptsecret",
        },
    },
    mongo: {
        DBURL: "mongodb://localhost:27017/customer_back",
        option: {
            dbName: "customer_back",
        },
    },
}