import {Router} from 'express';

import {accountController} from '../../../controllers';

// eslint-disable-next-line new-cap
const accountRouter = Router();
accountRouter.route('/login').post(accountController.login);
accountRouter.route('/detail').post(accountController.detail);
accountRouter.route('/logout').post(accountController.logout);

export default accountRouter;
