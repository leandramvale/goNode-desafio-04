'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' }
})

// criar um usuário
Route.post('users', 'UserController.store').validator('User')

// autenticar um usuário
Route.post('sessions', 'SessionController.store').validator('Session')

// listar usuários
Route.get('users', 'UserController.index')

// somente usuários autenticados
Route.group(() => {
  // rotas autenticadas para o usuário
  // alterar a senha de um usuário
  Route.put('users', 'UserController.update').validator('ChangePassword')
  // excluir um usuário
  Route.delete('users', 'UserController.destroy')

  // rotas autenticadas para eventos
  // criar um evento
  Route.post('eventos', 'EventoController.store').validator('Evento')
  // listar eventos com paginação
  Route.get('eventos', 'EventoController.index')
  // listar eventos de uma data
  Route.get('eventos/:data', 'EventoController.show')
  // excluir eventos
  Route.delete('eventos/:id', 'EventoController.destroy')
  // atualizar eventos
  Route.put('eventos/:id', 'EventoController.update')

  // rotas autenticadas para compartilhamentos
  // criar um compartilhamento
  Route.post('shares', 'ShareController.store').validator('Share')
}).middleware(['auth'])
