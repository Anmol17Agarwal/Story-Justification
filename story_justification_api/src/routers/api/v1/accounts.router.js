import {Router} from 'express';

import {accountController} from '../../../controllers';

// eslint-disable-next-line new-cap
const accountRouter = Router();
accountRouter.route('/login').post(accountController.login);
accountRouter.route('/detail').get(accountController.detail);
accountRouter.route('/logout').delete(accountController.logout);

export default accountRouter;
