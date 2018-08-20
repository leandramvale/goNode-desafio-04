'use strict'

const Mail = use('Mail')

class NewShareEmail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'NewShareEmail-job'
  }

  // This is where the work is done.
  async handle ({ email, username, titulo, localizacao, data, hora }) {
    console.log('NewShareEmail-job started')
    console.log(`Job: ${NewShareEmail.key}`)

    // envio de email
    await Mail.send(
      ['emails.new_share'],
      {
        username,
        titulo,
        localizacao,
        data,
        hora
      },
      message => {
        message
          .to(email)
          .from('leandramvale@gmail.com', 'Leandra | LS')
          .subject('Novo compromisso compartilhado com você')
      }
    )
  }
}

module.exports = NewShareEmail
