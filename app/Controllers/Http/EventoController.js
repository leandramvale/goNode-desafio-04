'use strict'

const moment = require('moment')

const Evento = use('App/Models/Evento')

/**
 * Resourceful controller for interacting with eventos
 */
class EventoController {
  /**
   * Show a list of all eventos.
   * GET eventos
   */
  async index ({ request, response, auth }) {
    const { page } = request.get()

    const eventos = await Evento.query()
      .with('user')
      // .fetch()
      .paginate(page)

    return eventos
  }

  /**
   * Render a form to be used for creating a new evento.
   * GET eventos/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new evento.
   * POST eventos
   */
  async store ({ request, response, auth }) {
    try {
      const data = request.only(['titulo', 'localizacao', 'data', 'hora'])

      // console.log(data)

      const jaTemEvento = await Evento.findBy({'data': data.data, 'hora': data.hora})

      // console.log(jaTemEvento)

      if (jaTemEvento) {
        return response
          .status(401)
          .send({ error: { message: 'Já temos evento nesta data e horário!' } })
      }

      const evento = await Evento.create({ ...data, user_id: auth.user.id })
      return evento
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Erro no cadastro do evento!' } })
    }
  }

  /**
   * Display a single evento.
   * GET eventos/:id
   */
  async show ({ params, request, response, view }) {
    // console.log(params.data)

    const eventos = await Evento.query()
      .where('data', '=', params.data)
      .with('user')
      .fetch()

    return eventos
  }

  /**
   * Render a form to update an existing evento.
   * GET eventos/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update evento details.
   * PUT or PATCH eventos/:id
   */
  async update ({ params, request, response }) {
    const evento = await Evento.findOrFail(params.id)

    const data = request.only(['titulo', 'localizacao', 'data', 'hora'])

    if (evento.data < moment().format('YYYYMMDD')) {
      return response
        .status(401)
        .send({ error: { message: 'Evento já passou!' } })
    }

    evento.merge(data)

    await evento.save()

    return evento
  }

  /**
   * Delete a evento with id.
   * DELETE eventos/:id
   */
  async destroy ({ params, request, response }) {
    const evento = await Evento.findOrFail(params.id)

    if (evento.data < moment().format('YYYYMMDD')) {
      return response
        .status(401)
        .send({ error: { message: 'Evento já passou!' } })
    }

    await evento.delete()
  }
}

module.exports = EventoController
