'use strict'

const Model = use('Model')

class Share extends Model {
  static boot () {
    super.boot()

    this.addHook('afterCreate', 'ShareHook.sendNewShareMail')
    this.addHook('beforeUpdate', 'ShareHook.sendNewShareMail')
  }

  evento () {
    return this.belongsTo('App/Models/Evento')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Share
