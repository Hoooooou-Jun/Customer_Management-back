import express from 'express';
import config from 'config';
import bodyParser from 'body-parser';
import connect from './utils/connect';
import logger from './utils/logger'
import userRoutes from './routes/user';

const app = express();

app.use(bodyParser.json());

app.get('/', (req:express.Request, res:express.Response, next: express.NextFunction) => {
    res.send('Hello');
});

app.use('/users', userRoutes)

app.listen(config.get<number>('server.PORT'), async () => {
    logger.info(`App is running at http://localhost:${config.get<number>('server.PORT')}`);
    await connect();
});