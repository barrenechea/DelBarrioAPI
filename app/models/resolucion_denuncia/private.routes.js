import express from 'express';
import * as controller from './controller.js';
import inject from '../../middlewares/injection.js';

const app = express.Router();

app.route('/resolucion_denuncia/:id([0-9]+)?')
  .get((req, res) => controller.GET(req, res))
  .post(inject.IDEN_USUARIO(), (req, res) => controller.POST(req, res))
  .put((req, res) => controller.PUT(req, res))
  .delete((req, res) => controller.DELETE(req, res));

export default app;
