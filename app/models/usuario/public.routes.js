import express from 'express';
import * as controller from './controller.js';

const app = express.Router();

app.route('/usuario/:id([0-9]+)?')
  .get((req, res) => controller.GET(req, res))
  .post((req, res) => controller.POST(req, res));

export default app;
