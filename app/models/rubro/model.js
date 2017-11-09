import bookshelf from '../../connection'

/* Se define el modelo */
const Model = bookshelf.Model.extend({
  tableName: 'PER_RUBROS',
  idAttribute: 'IDEN_RUBRO',
  emprendedores: function () {
    return this.belongsToMany(require('../emprendedor/model').Model, 'PER_RUBROS_EMPRENDEDORES', 'IDEN_RUBRO', 'IDEN_EMPRENDEDOR')
  }
})

/* Se define colección a partir del modelo */
const Collection = bookshelf.Collection.extend({
  model: Model
})

/* Se exportan las constantes */
module.exports = {
  Model,
  Collection,
}
