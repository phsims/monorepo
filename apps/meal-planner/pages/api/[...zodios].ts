import { zodiosNextApp } from '@zodios/express';
import { router } from '@recipes';

const server = zodiosNextApp();

server.use('/api', router);

export default server;
