'use strict'

const Schema = use('Schema')

class EventosSchema extends Schema {
  up () {
    this.create('eventos', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('titulo').notNullable()
      table.text('localizacao').notNullable()
      table.string('data').notNullable()
      table.string('hora').notNullable()

      table.timestamps()
    })
  }

  down () {
    this.drop('eventos')
  }
}

module.exports = EventosSchema
