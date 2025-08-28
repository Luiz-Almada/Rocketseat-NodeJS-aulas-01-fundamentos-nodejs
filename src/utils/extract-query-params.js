// ['?search=Balbino', 'page=2'] => { search: 'Balbino', page: '2' }

// ['search', 'Balbino']
// ['page', '2']

export function extractQueryParams(query) {

  return query.substr(1).split('&').reduce((queryParams, param) => {
    const [key, value] = param.split('=')

    queryParams[key] = value

    return queryParams
  }, {})

/*   return query
    .replace('?', '')
    .split('&')
    .map(param => param.split('='))
    .reduce((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {}) */
  
}