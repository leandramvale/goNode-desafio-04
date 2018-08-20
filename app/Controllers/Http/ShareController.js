'use strict'

const User = use('App/Models/User')
const Evento = use('App/Models/Evento')
const Share = use('App/Models/Share')

/**
 * Resourceful controller for interacting with shares
 */
class ShareController {
  /**
   * Show a list of all shares.
   * GET shares
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new share.
   * GET shares/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new share.
   * POST shares
   */
  async store ({ request, response }) {
    try {
      const data = request.only(['evento_id', 'email'])

      const userExists = await User.findBy({'email': data.email})

      if (!userExists) {
        return response
          .status(401)
          .send({ error: { message: 'Não existe usuário com este email!' } })
      }

      const eventoExists = await Evento.findBy({'id': data.evento_id})

      if (!eventoExists) {
        return response
          .status(401)
          .send({ error: { message: 'Não existe esse evento!' } })
      }

      const share = await Share.create({ evento_id: eventoExists.id, user_id: userExists.id })
      return share
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Erro no compartilhamento do evento!' } })
    }
  }

  /**
   * Display a single share.
   * GET shares/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing share.
   * GET shares/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update share details.
   * PUT or PATCH shares/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a share with id.
   * DELETE shares/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ShareController
