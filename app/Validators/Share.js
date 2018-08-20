'use strict'

const Antl = use('Antl')

class Share {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      // validation rules
      evento_id: 'required',
      email: 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Share
