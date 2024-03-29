// Dependencies injection
import express from 'express';
import passport from 'passport';
import cors from 'cors';

// LOG
import logger from 'simple-express-logger';
import fs from 'fs';
import morgan from 'morgan'; // Generate log
import path from 'path';
import rfs from 'rotating-file-stream'; // Unique log day

import moment from 'moment';
import { strategy } from './app/middlewares/jwt-strategie.js';
import cn from './config.js';

// PUBLIC AND PRIVATE PATH
import publicRoutes from './app/public.routes.js';
import privateRoutes from './app/private.routes.js';

moment.locale('es');

const app = express();

// LOGS
// =============================================================================
const logDirectory = path.join('log/');
if (!fs.existsSync(logDirectory)) fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream(`${moment().format('DD-MM-YYYY')}_access.log`, {
  interval: '1d', // rotate daily  //   interval: '5s', // rotate 5 segundos
  intervalBoundary: true,
  path: logDirectory,
});

// AUTH
// =============================================================================
passport.use(strategy);

// MIDLEWARES
// =============================================================================
app.use(cors({ credentials: true, origin: true }));
app.use(logger());
app.use(morgan('combined', { stream: accessLogStream }));
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// INCLUDE ROUTES - PRIVATE AND PUBLIC
// =============================================================================
publicRoutes.map((route) => app.use('/', route));
privateRoutes.map((route) => app.use('/private', passport.authenticate('jwt', { session: false }), route));

app.listen(cn.apiPort, () => { console.log(`API REST corriendo en ${cn.apiHost}:${cn.apiPort}`); }); // eslint-disable-line no-console

export default app;
