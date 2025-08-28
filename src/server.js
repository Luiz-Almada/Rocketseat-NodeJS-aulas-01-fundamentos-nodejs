import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'

// Query Parameters: URL Stateful => Filtros, paginação, não-obrigatórios
// Route Parameters: Identificação de recursos
// Request Body: Envia as informações de uma formulário (HTTPs)

// http://localhost:3333/users/?userId=1&name=Almada - Query Parameters

// GET http://localhost:3333/users/1 - Route Parameters
// DELETE http://localhost:3333/users/1 - Route Parameters

// POST http://localhost:3333/users - Request Body

// Criar rotas para Edição e Remoção

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res);

  const route = routes.find(route => {
    //return route.method === method && route.path === url
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    const params = {...routeParams.groups}

    console.log(params)

    return route.handler(req, res)
  }

  return res.writeHead(404).end()
});

server.listen(3333)


