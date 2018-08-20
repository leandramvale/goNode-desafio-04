'use strict'

const Hash = use('Hash')
const User = use('App/Models/User')

class UserController {
  async index () {
    const users = await User.query().fetch()

    return users
  }

  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])

    const user = await User.create(data)

    return user
  }

  async update ({ request, response, auth }) {
    const { username, password, newPassword } = request.all()

    const user = await User.findByOrFail('id', auth.user.id)

    // console.log(user.password)
    // console.log(await Hash.make(password))

    const isSame = await Hash.verify(password, user.password)

    if (!isSame) {
      return response
        .status(401)
        .send({ error: { message: `A senha atual do usuário ${user.username} não confere!` } })
    }

    user.username = username
    user.password = newPassword

    await user.save()

    return user
  }

  async destroy ({ request, response, auth }) {
    const user = await User.findByOrFail('id', auth.user.id)

    await user.delete()
  }
}

module.exports = UserController
