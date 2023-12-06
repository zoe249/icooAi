const OpenAI = require('openai')
// import instance from './request'
const { instance } = require('./request/index')

async function openaiMain() {
  console.log('发送前')
  // const completion = await openai.chat.completions.create({
  //   messages: [{ role: 'user', content: 'You are a helpful assistant.' }],
  //   apiKey: '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',
  //   model: 'gpt-3.5-turbo'
  // })
  const a = await instance({
    method: 'post',
    data: JSON.stringify({
      messages: [{ role: 'user', content: '理塘王' }],
      model: 'gpt-3.5-turbo',
      max_tokens: 1024,
      top_p: 1,
      n: 1,
      stream: false,
    }),
  })
  console.log('发送后')
  console.log(a.data.choices[0].message)
}

openaiMain()
