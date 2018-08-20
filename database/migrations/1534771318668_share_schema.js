'use strict'

const Schema = use('Schema')

class ShareSchema extends Schema {
  up () {
    this.create('shares', (table) => {
      table.increments()
      table
        .integer('evento_id')
        .unsigned()
        .references('id')
        .inTable('eventos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')

      table.timestamps()
    })
  }

  down () {
    this.drop('shares')
  }
}

module.exports = ShareSchema
