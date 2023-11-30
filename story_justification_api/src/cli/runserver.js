import {Server} from 'http';

import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';

import {authenticate} from '../middlewares';
import routers from '../routers';
import {MONGODB_URI} from '../settings';

/**
 * Get request listener for server.
 * @return {express.Application}
 */
export function getRequestListener() {
  const application = express();
  application.use(helmet());
  application.use(express.urlencoded({extended: true}));
  application.use(express.json());
  application.use(morgan('combined'));
  application.use(authenticate);

  routers.forEach((router, path) => {
    application.use(path, router);
  });

  return application;
}

/**
 * Run server for CLI.
 * @param {number} port
 * @param {string} host
 */
export default async function runServer(port, host) {
  const options = {};
  const requestListener = getRequestListener();
  const server = new Server(options, requestListener);

  await mongoose.connect(MONGODB_URI);
  server.listen(port, host, () => {
    console.info(server.address());
  });
}
