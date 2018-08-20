'use strict'

const Antl = use('Antl')

class ChangePassword {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      // validation rules
      username: 'required',
      password: 'required',
      newPassword: 'required|confirmed'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = ChangePassword
