import supertest from 'supertest';

import {getRequestListener} from '../src/cli/runserver';

const request = supertest(getRequestListener());
