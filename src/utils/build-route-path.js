// /users/:id
export function buildRoutePath(path){
  const routeParametersRegex = /:([a-zA-Z]*)/g

  // ?<id>: Nomeia o primeiro elemento do grupo na Regex (índice 1)
  // ?<$1>: Nomeia todos os elementos do grupo na Regex

  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

  const pathRegex = new RegExp(`^${pathWithParams}`) 

  return pathRegex
}