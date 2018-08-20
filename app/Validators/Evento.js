'use strict'

const Antl = use('Antl')

class Evento {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      // validation rules
      titulo: 'required',
      localizacao: 'required',
      data: 'required',
      hora: 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Evento
