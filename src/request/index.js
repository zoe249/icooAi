const axios = require('axios')

const instance = axios.create({
  baseURL: 'https://api.openai-proxy.com/v1/chat/completions',
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer ' + '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'
  }
})

module.exports = {
  instance
}
