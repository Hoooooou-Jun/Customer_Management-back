import logger from 'pino';
import dayjs from 'dayjs';

const log = logger({
    prettyPrint: true,
    base: {
        pid: false // process id
    },
    timestamp: () => `,"time": "${dayjs().format()}"`,
});

export default log;