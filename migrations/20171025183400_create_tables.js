exports.up = function(knex) {
  return createSisRoles()
    .then(createSisPermisos)
    .then(createSisPermisosRoles)
    .then(createUsrUsuarios)
    .then(createPerTelefonos)
    .then(createPerRubros)
    .then(createPerEmprendedores)
    .then(createPerRubrosEmprendedores)
    .then(createPerPersonas)
    .then(createReqCategorias)
    .then(createReqTiposPublicacion)
    .then(createReqPublicaciones)
    .then(createReqImagenes)
    .then(createReqOfertas)
    .then(createReqEtiquetas)
    .then(createReqPublicacionesEtiquetas)
    .then(createReqComentarios)
    .then(createReqRespuestas)
    .then(createReqCalificaciones)
    .then(createReqMotivosDenuncia)
    .then(createReqDenuncias)
    .then(createReqResolucionDenuncias)
    .then(createReqFaq)

  function createSisRoles () {
    return knex.schema.createTableIfNotExists('SIS_ROLES', function(table) {
      table.increments('IDEN_ROL').unsigned().primary()
      table.integer('CODI_ROL').notNull().unique()
      table.string('NOMB_ROL').notNull()
      table.string('DESC_ROL').notNull()
    })
  }

  function createSisPermisos () {
    return knex.schema.createTableIfNotExists('SIS_PERMISOS', function(t) {
      t.increments('IDEN_PERMISO').unsigned().primary()
      t.integer('CODI_PERMISO').notNull().unique()
      t.string('DESC_PERMISO').notNull()
    })
  }

  function createSisPermisosRoles () {
    return knex.schema.createTableIfNotExists('SIS_PERMISOS_ROLES', function(table) {
      table.increments('IDEN_PERMISOS_ROLES').unsigned().primary()
      table.integer('IDEN_PERMISO').unsigned().notNull()
      table.integer('IDEN_ROL').unsigned().notNull()
        
      table.foreign('IDEN_PERMISO').references('SIS_PERMISOS.IDEN_PERMISO').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('IDEN_ROL').references('SIS_ROLES.IDEN_ROL').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  function createUsrUsuarios () {
    return knex.schema.createTableIfNotExists('USR_USUARIOS', function(table) {
      table.bigIncrements('IDEN_USUARIO').unsigned().primary()
      table.integer('IDEN_ROL').unsigned()
      table.integer('RUT_USUARIO').notNull()
      table.string('DV_USUARIO', 1).notNull()
      table.string('EMAIL_USUARIO').notNull()
      table.string('DESC_PASSWORD').notNull()
      table.boolean('FLAG_VIGENTE').notNull().defaultTo(true)
    
      table.foreign('IDEN_ROL').references('SIS_ROLES.IDEN_ROL').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  function createPerTelefonos () {
    return knex.schema.createTableIfNotExists('PER_TELEFONOS', function(table) {
      table.bigIncrements('IDEN_FONO').unsigned().primary()
      table.bigInteger('IDEN_USUARIO').unsigned().notNull()
      table.string('NUMR_FONO').notNull()
      table.integer('CODI_FONO').notNull()
    
      table.foreign('IDEN_USUARIO').references('USR_USUARIOS.IDEN_USUARIO').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  function createPerRubros () {
    return knex.schema.createTableIfNotExists('PER_RUBROS', function(table) {
      table.increments('IDEN_RUBRO').unsigned().primary()
      table.string('NOMB_RUBRO').notNull()
      table.string('DESC_RUBRO').notNull()
    })
  }

  function createPerEmprendedores () {
    return knex.schema.createTableIfNotExists('PER_EMPRENDEDORES', function(table) {
      table.bigIncrements('IDEN_EMPRENDEDOR').unsigned().primary()
      table.bigInteger('IDEN_USUARIO').unsigned()
      table.string('DESC_EMPRENDEDOR').notNull()
      table.string('DESC_CLAVE_MUNICIPALIDAD').notNull()
      table.string('DESC_NOMBRE_FANTASIA').notNull()
      table.string('DESC_NOMBRE_EMPRESA').notNull()
        
      table.foreign('IDEN_USUARIO').references('USR_USUARIOS.IDEN_USUARIO').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  function createPerRubrosEmprendedores () {
    return knex.schema.createTableIfNotExists('PER_RUBROS_EMPRENDEDORES', function(table) {
      table.increments('IDEN_RUBROS_EMPRENDEDORES').unsigned().primary()
      table.integer('IDEN_RUBRO').unsigned().notNull()
      table.bigInteger('IDEN_EMPRENDEDOR').unsigned().notNull()
        
      table.foreign('IDEN_RUBRO').references('PER_RUBROS.IDEN_RUBRO').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('IDEN_EMPRENDEDOR').references('PER_EMPRENDEDORES.IDEN_EMPRENDEDOR').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  function createPerPersonas () {
    return knex.schema.createTableIfNotExists('PER_PERSONAS', function(table) {
      table.bigIncrements('IDEN_PERSONA').unsigned().primary()
      table.bigInteger('IDEN_USUARIO').unsigned().notNull()
      table.string('NOMBRES').notNull()
      table.string('APELLIDO_PATERNO').notNull()
      table.string('APELLIDO_MATERNO').notNull()
      table.date('FECH_FECHA_NACIMIENTO').notNull()

      table.foreign('IDEN_USUARIO').references('USR_USUARIOS.IDEN_USUARIO').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  function createReqCategorias () {
    return knex.schema.createTableIfNotExists('REQ_CATEGORIAS', function(table) {
      table.increments('IDEN_CATEGORIA').unsigned().primary()
      table.integer('IDEN_CATEGORIA_PADRE').unsigned()
      table.string('NOMB_CATEGORIA').notNull()
      table.string('DESC_CATEGORIA').notNull()

      table.foreign('IDEN_CATEGORIA_PADRE').references('REQ_CATEGORIAS.IDEN_CATEGORIA').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  function createReqTiposPublicacion () {
    return knex.schema.createTableIfNotExists('REQ_TIPOS_PUBLICACION', function(table) {
      table.increments('IDEN_TIPO_PUBLICACION').unsigned().primary()
      table.string('NOMB_TIPO_PUBLICACION').notNull()
      table.string('DESC_TIPO_PUBLICACION').notNull()
    })
  }

  function createReqPublicaciones () {
    return knex.schema.createTableIfNotExists('REQ_PUBLICACIONES', function(table) {
      table.bigIncrements('IDEN_PUBLICACION').unsigned().primary()
      table.bigInteger('IDEN_EMPRENDEDOR').unsigned().notNull()
      table.integer('IDEN_TIPO_PUBLICACION').unsigned().notNull()
      table.integer('IDEN_CATEGORIA').unsigned().notNull()
      table.string('NOMB_PUBLICACION').notNull()
      table.text('DESC_PUBLICACION', 'longtext')
      table.integer('NUMR_PRECIO').unsigned().notNull()
      table.dateTime('FECH_CREACION').notNull().defaultTo(knex.raw('now()'))
      table.boolean('FLAG_CONTENIDO_ADULTO').notNull().defaultTo(false)
      table.boolean('FLAG_ACTIVA').notNull().defaultTo(true)

      table.foreign('IDEN_EMPRENDEDOR').references('PER_EMPRENDEDORES.IDEN_EMPRENDEDOR').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('IDEN_TIPO_PUBLICACION').references('REQ_TIPOS_PUBLICACION.IDEN_TIPO_PUBLICACION').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('IDEN_CATEGORIA').references('REQ_CATEGORIAS.IDEN_CATEGORIA').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  function createReqImagenes () {
    return knex.schema.createTableIfNotExists('REQ_IMAGENES', function(table) {
      table.bigIncrements('IDEN_IMAGEN').unsigned().primary()
      table.bigInteger('IDEN_PUBLICACION').unsigned()
      table.bigInteger('IDEN_EMPRENDEDOR').unsigned()
      table.string('URL_IMAGEN').notNull()

      table.foreign('IDEN_PUBLICACION').references('REQ_PUBLICACIONES.IDEN_PUBLICACION').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('IDEN_EMPRENDEDOR').references('PER_EMPRENDEDORES.IDEN_EMPRENDEDOR').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  function createReqOfertas () {
    return knex.schema.createTableIfNotExists('REQ_OFERTAS', function(table) {
      table.increments('IDEN_OFERTA').unsigned().primary()
      table.bigInteger('IDEN_PUBLICACION').unsigned()
      table.dateTime('FECH_INICIO').notNull()
      table.dateTime('FECH_TERMINO').notNull()
      table.integer('NUMR_PRECIO').unsigned().notNull()

      table.foreign('IDEN_PUBLICACION').references('REQ_PUBLICACIONES.IDEN_PUBLICACION').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  function createReqEtiquetas () {
    return knex.schema.createTableIfNotExists('REQ_ETIQUETAS', function(table) {
      table.bigIncrements('IDEN_ETIQUETA').unsigned().primary()
      table.string('NOMB_ETIQUETA').notNull()
    })
  }

  function createReqPublicacionesEtiquetas () {
    return knex.schema.createTableIfNotExists('REQ_PUBLICACIONES_ETIQUETAS', function(table) {
      table.bigIncrements('IDEN_PUBLICACION_ETIQUETA').unsigned().primary()
      table.bigInteger('IDEN_ETIQUETA').unsigned().notNull()
      table.bigInteger('IDEN_PUBLICACION').unsigned().notNull()

      table.foreign('IDEN_ETIQUETA').references('REQ_ETIQUETAS.IDEN_ETIQUETA').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('IDEN_PUBLICACION').references('REQ_PUBLICACIONES.IDEN_PUBLICACION').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  function createReqComentarios () {
    return knex.schema.createTableIfNotExists('REQ_COMENTARIOS', function(table) {
      table.bigIncrements('IDEN_COMENTARIO').unsigned().primary()
      table.bigInteger('IDEN_PUBLICACION').unsigned().notNull()
      table.bigInteger('IDEN_USUARIO').unsigned().notNull()
      table.string('DESC_COMENTARIO').notNull()
      table.dateTime('FECH_CREACION').notNull().defaultTo(knex.raw('now()'))
      
      table.foreign('IDEN_PUBLICACION').references('REQ_PUBLICACIONES.IDEN_PUBLICACION').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('IDEN_USUARIO').references('USR_USUARIOS.IDEN_USUARIO').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  function createReqRespuestas () {
    return knex.schema.createTableIfNotExists('REQ_RESPUESTAS', function(table) {
      table.bigIncrements('IDEN_RESPUESTA').unsigned().primary()
      table.bigInteger('IDEN_COMENTARIO').unsigned().notNull()
      table.string('DESC_RESPUESTA').notNull()
      table.dateTime('FECH_CREACION').notNull().defaultTo(knex.raw('now()'))
      
      table.foreign('IDEN_COMENTARIO').references('REQ_COMENTARIOS.IDEN_COMENTARIO').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  function createReqCalificaciones () {
    return knex.schema.createTableIfNotExists('REQ_CALIFICACIONES', function(table) {
      table.bigIncrements('IDEN_CALIFICACION').unsigned().primary()
      table.bigInteger('IDEN_PUBLICACION').unsigned().notNull()
      table.bigInteger('IDEN_USUARIO').unsigned().notNull()
      table.integer('NUMR_VALOR').notNull()
      table.string('DESC_CALIFICACION')
      table.dateTime('FECH_CREACION').notNull().defaultTo(knex.raw('now()'))
      
      table.foreign('IDEN_PUBLICACION').references('REQ_PUBLICACIONES.IDEN_PUBLICACION').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('IDEN_USUARIO').references('USR_USUARIOS.IDEN_USUARIO').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  function createReqMotivosDenuncia () {
    return knex.schema.createTableIfNotExists('REQ_MOTIVOS_DENUNCIA', function(table) {
      table.increments('IDEN_MOTIVO_DENUNCIA').unsigned().primary()
      table.string('NOMB_MOTIVO_DENUNCIA').notNull()
      table.string('DESC_MOTIVO_DENUNCIA').notNull()
    })
  }

  function createReqDenuncias () {
    return knex.schema.createTableIfNotExists('REQ_DENUNCIAS', function(table) {
      table.bigIncrements('IDEN_DENUNCIA').unsigned().primary()
      table.bigInteger('IDEN_PUBLICACION').unsigned()
      table.bigInteger('IDEN_CALIFICACION').unsigned()
      table.bigInteger('IDEN_COMENTARIO').unsigned()
      table.bigInteger('IDEN_USUARIO').unsigned().notNull()
      table.integer('IDEN_MOTIVO_DENUNCIA').unsigned().notNull()
      table.text('DESC_DENUNCIA').notNull()
      table.dateTime('FECH_CREACION').notNull().defaultTo(knex.raw('now()'))
      
      table.foreign('IDEN_PUBLICACION').references('REQ_PUBLICACIONES.IDEN_PUBLICACION').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('IDEN_CALIFICACION').references('REQ_CALIFICACIONES.IDEN_CALIFICACION').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('IDEN_COMENTARIO').references('REQ_COMENTARIOS.IDEN_COMENTARIO').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('IDEN_USUARIO').references('USR_USUARIOS.IDEN_USUARIO').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('IDEN_MOTIVO_DENUNCIA').references('REQ_MOTIVOS_DENUNCIA.IDEN_MOTIVO_DENUNCIA').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  function createReqResolucionDenuncias () {
    return knex.schema.createTableIfNotExists('REQ_RESOLUCION_DENUNCIAS', function(table) {
      table.bigIncrements('IDEN_RESOLUCION_DENUNCIA').unsigned().primary()
      table.bigInteger('IDEN_DENUNCIA').unsigned().notNull()
      table.bigInteger('IDEN_USUARIO').unsigned().notNull()
      table.string('ESTD_RESOLUCION', 1).notNull().defaultTo('A')
      table.string('DESC_RESOLUCION').notNull()
      table.dateTime('FECH_CREACION').notNull().defaultTo(knex.raw('now()'))
      
      table.foreign('IDEN_DENUNCIA').references('REQ_DENUNCIAS.IDEN_DENUNCIA').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('IDEN_USUARIO').references('USR_USUARIOS.IDEN_USUARIO').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  function createReqFaq () {
    return knex.schema.createTableIfNotExists('REQ_FAQ', function(table) {
      table.increments('IDEN_FAQ').unsigned().primary()
      table.string('NOMB_FAQ').notNull()
      table.string('DESC_FAQ').notNull()
    })
  }
}

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('REQ_FAQ')
    .dropTableIfExists('REQ_RESOLUCION_DENUNCIAS')
    .dropTableIfExists('REQ_DENUNCIAS')
    .dropTableIfExists('REQ_MOTIVOS_DENUNCIA')
    .dropTableIfExists('REQ_CALIFICACIONES')
    .dropTableIfExists('REQ_RESPUESTAS')
    .dropTableIfExists('REQ_COMENTARIOS')
    .dropTableIfExists('REQ_PUBLICACIONES_ETIQUETAS')
    .dropTableIfExists('REQ_ETIQUETAS')
    .dropTableIfExists('REQ_OFERTAS')
    .dropTableIfExists('REQ_IMAGENES')
    .dropTableIfExists('REQ_PUBLICACIONES')
    .dropTableIfExists('REQ_TIPOS_PUBLICACION')
    .dropTableIfExists('REQ_CATEGORIAS')
    .dropTableIfExists('PER_PERSONAS')
    .dropTableIfExists('PER_RUBROS_EMPRENDEDORES')
    .dropTableIfExists('PER_EMPRENDEDORES')
    .dropTableIfExists('PER_RUBROS')
    .dropTableIfExists('PER_TELEFONOS')
    .dropTableIfExists('USR_USUARIOS')
    .dropTableIfExists('SIS_PERMISOS_ROLES')
    .dropTableIfExists('SIS_PERMISOS')
    .dropTableIfExists('SIS_ROLES')
}