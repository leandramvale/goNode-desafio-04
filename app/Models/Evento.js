'use strict'

const Model = use('Model')

class Evento extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  shares () {
    return this.hasMany('App/Models/Share')
  }
}

module.exports = Evento
