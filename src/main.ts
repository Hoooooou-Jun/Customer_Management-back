import express from 'express';
import config from '../config/default';
import bodyParser from 'body-parser';
import connect from './utils/connect';
import logger from './utils/logger'
import helloRoutes from './routes/hello';

const app = express();

app.use(bodyParser.json());

app.get('/', (req:express.Request, res:express.Response, next: express.NextFunction) => {
    res.send('Hello');
});

app.use('/main', helloRoutes)

app.listen(config.server.port, async () => {
    logger.info(`App is running at http://localhost:${config.server.port}`);
    await connect();
});