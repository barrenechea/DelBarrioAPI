import Checkit from 'checkit';
import { knex } from '../../connection.js';

// Nombres de atributos en formato legible
const labels = {
  IDEN_COMENTARIO: 'ID de comentario',
  DESC_RESPUESTA: 'Respuesta',
};

// Valores nativos de validaciones checkit en https://github.com/tgriesser/checkit
const validations = {
  IDEN_COMENTARIO: [{
    rule: 'required',
    label: labels.IDEN_COMENTARIO,
  }, {
    rule: 'number',
    message: `${labels.IDEN_COMENTARIO} debe ser de tipo "integer"`,
  }, {
    rule: async (val) => {
      const resp = await knex('REQ_COMENTARIOS').where('IDEN_COMENTARIO', '=', val);
      if (resp.length === 0) throw new Error(`${labels.IDEN_COMENTARIO} no existe`);
    },
  }],
  DESC_RESPUESTA: [{
    rule: 'required',
    label: labels.DESC_RESPUESTA,
  }, {
    rule: 'maxLength:255',
    label: labels.DESC_RESPUESTA,
  }],
};

/**
 * Ejecuta validaciones de un modelo, retornando Promise
 * @param {bookshelf.Model} model Modelo a validar
 */
const validate = (model) => Checkit(validations, { language: 'es' }).run(model.toJSON());

// Se exporta función
export default validate;
