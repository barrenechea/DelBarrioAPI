import express from 'express';
import * as clientes from './private/clientes.js';
import * as administradores from './private/administradores.js';
import * as comentarios from './private/miscomentarios.js';
import * as publicaciones from './private/mispublicaciones.js';

import inject from '../middlewares/injection.js';

const app = express.Router();

app.route('/clientes')
  .get((req, res) => clientes.GET(req, res));

app.route('/administradores')
  .get((req, res) => administradores.GET(req, res));

app.route('/miscomentarios')
  .get(inject.IDEN_EMPRENDEDOR(), (req, res) => comentarios.GET(req, res));

app.route('/mispublicaciones')
  .get(inject.IDEN_EMPRENDEDOR(), (req, res) => publicaciones.GET(req, res));

export default app;
