'use strict'

const Kue = use('Kue')
const Job = use('App/Jobs/NewShareEmail')

const ShareHook = exports = module.exports = {}

ShareHook.sendNewShareMail = async (shareInstance) => {
  if (!shareInstance.user_id && !shareInstance.dirty.user_id) return

  const { email, username } = await shareInstance.user().fetch()

  const { titulo, localizacao, data, hora } = await shareInstance.evento().fetch()

  Kue.dispatch(Job.key, { email, username, titulo, localizacao, data, hora }, { attempts: 3 })
}
