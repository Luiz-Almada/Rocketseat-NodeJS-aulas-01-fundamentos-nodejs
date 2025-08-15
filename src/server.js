// Módulos internos do NodeJS:
// - http: cria servidor http (get, post, put, push, delete, etc..)

// Modo de importação antiga (CommonJS)
//const http = require('http')

// Modo de importação novo (Module JS)
// node: recomendado para identificar os módulos internos do NodeJS
import http from 'node:http'


// - Criar usuários
// - Listagem de usuários
// - Edição de usuários
// - remoção de usuários

// - HTTP
//  - Métodos HTTP: GET, POST, PUT, PATCH, DELETE
//  - URL

// GET, POST, PUT, PATCH, DELETE: 
// - São mais semânticos do que funcionais, ou seja, 
// pode ser utilizado qualquer método para qualquer ação, 
// mas é uma convenção seguir esses métodos para cada ação específica.

// GET: Buscar um recurso do back-end
// POST: Criar um recurso no back-end
// PUT: Atualizar um recurso no back-end
// PATCH: Atualizar uma informação específica de um recurso no back-end (parcialmente)
// DELETE: Deletar um recurso do back-end

// A concatenação do método HTTP e a URL é o que define a rota do servidor.
//  - GET /users => Buscando usuários do back-end
//  - POST /users => Criando um usuário no back-end
//  - DELETE /users/1 => Removendo o usuário de ID 1 no back-end
//  - PUT /users/1 => Atualizando o usuário de ID 1 no back-end 
//  - PATCH /users/1 => Atualizando uma informação específica do usuário de ID 1 no back-end

// Statefull: é quando o servidor mantém o estado da aplicação, ou seja,
// ele armazena informações sobre o usuário, como sessões, cookies, etc.
// Isso permite que o servidor saiba quem é o usuário e quais ações ele pode realizar.

// Stateless: é quando o servidor não mantém o estado da aplicação, ou seja,
// ele não armazena informações sobre o usuário.
// Cada requisição é independente e não há informações armazenadas sobre o usuário.
// As informações são armazenas em dispositivos externos, como bancos de dados, cookies, etc.

// JSON: JavaScript Object Notation

// Cabeçalhos (Requisição / Resposta) => Metadados da requisição/resposta (dados adicionais sobre a requisição/resposta)
// - Content-Type: application/json (indica que o corpo da requisição/resposta é um JSON)
// - Accept: application/json (indica que o cliente aceita receber um JSON como resposta) 

const users = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch (error) {
    req.body = null
  }

  if (method === 'GET' && url === '/users') {
    // Ealry return
    return res
    .setHeader('Content-Type', 'application/json')
    .end(JSON.stringify(users));
  }

  if (method === 'POST' && url === '/users') {

    const { name, email } = req.body;

    users.push({
      id: 1,
/*       name: 'John Doe',
      email: 'johndoe@example.com' */
      name,
      email
    });  
    //return res.end('Criação de usuário');
    return res.writeHead(201).end()
  }

  //return res.end('Hello World')
  return res.writeHead(404).end()
});

server.listen(3333)


