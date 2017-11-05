'use strict'
var model = require('./model')

/*
**** METODOS HTTP UTILIZADOS ****
* GET:      Consultar y leer recursos
* POST:     Permite crear un nuevo recurso
* PUT:      Permite editar un recurso
* DELETE:   Elimina un recurso
* PATCH:    Permite editar partes concretas de un recurso, recibe los datos mediante x-www-form-urlencode
*
**** PENDIENTE ****
* Implementar PATCH
* Implementar Relaciones / Herencia
*/

var getEmprendedor = function (req, res) {
  const emprendedorId = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(emprendedorId != 0) {
    new model.Emprendedor({IDEN_EMPRENDEDOR: emprendedorId}).fetch({withRelated: ['rubros']})
      .then(emprendedor => {
        if(!emprendedor) {
          res.status(404).json({error: true, data: {message: 'Emprendedor not found'}})
        } else {
          res.json({error: false, data: emprendedor.toJSON()})
        }
      }).catch(err => {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  } else {
    new model.Emprendedores().fetch({withRelated: ['rubros']})
      .then(emprendedores => {
        res.json({error: false, data: emprendedores.toJSON()})
      }).catch(err => {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  }
}

var postEmprendedor = function (req, res) {
  new model.Emprendedor({
    IDEN_USUARIO:             req.body.IDEN_USUARIO,
    DESC_EMPRENDEDOR:         req.body.DESC_EMPRENDEDOR,
    DESC_CLAVE_MUNICIPALIDAD: req.body.DESC_CLAVE_MUNICIPALIDAD,
    DESC_NOMBRE_FANTASIA:     req.body.DESC_NOMBRE_FANTASIA,
    DESC_NOMBRE_EMPRESA:      req.body.DESC_NOMBRE_EMPRESA
  }).save()
    .then(emprendedor => {
      res.json({error: false, data: emprendedor.toJSON()})
    }).catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

var putEmprendedor = function (req, res) {
  new model.Emprendedor({IDEN_EMPRENDEDOR: req.params.id})
    .fetch({require: true})
    .then(emprendedor => {
      emprendedor.save({
        IDEN_USUARIO:             req.body.IDEN_USUARIO || emprendedor.get('IDEN_USUARIO'),
        DESC_EMPRENDEDOR:         req.body.DESC_EMPRENDEDOR || emprendedor.get('DESC_EMPRENDEDOR'),
        DESC_CLAVE_MUNICIPALIDAD: req.body.DESC_CLAVE_MUNICIPALIDAD || emprendedor.get('DESC_CLAVE_MUNICIPALIDAD'),
        DESC_NOMBRE_FANTASIA:     req.body.DESC_NOMBRE_FANTASIA || emprendedor.get('DESC_NOMBRE_FANTASIA'),
        DESC_NOMBRE_EMPRESA:      req.body.DESC_NOMBRE_EMPRESA || emprendedor.get('DESC_NOMBRE_EMPRESA')
      })
        .then(() => {
          res.json({error: false, data: {message: 'Emprendedor successfully updated'}})
        })
        .catch(err => {
          res.status(500).json({error: true, data: {message: 'Internal error'}})
          throw err
        })
    })
    .catch(model.Emprendedor.NotFoundError, () => {
      res.status(404).json({error: true, data: {message: 'Emprendedor not found'}})
    })
    .catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

var deleteEmprendedor = function (req, res) {
  new model.Emprendedor({IDEN_EMPRENDEDOR: req.params.id})
    .destroy({require: true})
    .then(() => {
      res.json({error: false, data: {message: 'Emprendedor successfully deleted'}})
    })
    .catch(model.Emprendedor.NoRowsDeletedError, () => {
      res.status(404).json({error: true, data: {message: 'Emprendedor not found'}})
    })
    .catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

/* Exports all methods */
module.exports = {
  getEmprendedor,
  postEmprendedor,
  putEmprendedor,
  deleteEmprendedor
}
