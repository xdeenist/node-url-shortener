'use strict'

const axios = require('axios');

const authHeaders = {
  Accept: 'application/json',
  'Access-Control-Allow-Origin': '*'
}

exports.axios = (method, url, params, header) => {
  method = method.toLowerCase()
  const config = {
    method: method,
    url
  }

  if (method === 'get') {
    config.params = params
  } else if (method === 'post' || method === 'put' || method === 'delete') {
    config.data = params
  }

  config.headers = Object.assign(authHeaders, header || {})

  return new Promise((resolve, reject) => {
    return axios(config)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        if (error.response) {
          switch (error.response.status) {
            // case 401:
            //   // ApiBase.unauthoriseUser('')
            //   break
            // case 403:
            //   reject(error)
            //   break
            default:
              reject(error)
              break
          }
        } else {
          console.error(error)
          reject(error)
        }
      })
  })
}
