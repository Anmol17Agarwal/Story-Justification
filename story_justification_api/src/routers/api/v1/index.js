import {Router} from 'express';

import accountRouter from './accounts.router';

const routers = new Map([['/accounts', accountRouter]]);

// eslint-disable-next-line new-cap
const v1Router = Router();
routers.forEach((router, path) => {
  v1Router.use(path, router);
});

export default v1Router;
