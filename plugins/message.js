// const { openaiMain } = require('../src/openai/index.ts')
module.exports = {
  OnMessageReceive,
}

const { instance } = require('../src/request/index')

const MESSAGE = '陨过天晴 梦糸三载 即使未回首 也知你在此'

function OnMessageReceive(msg) {
  const msgObj = JSON.parse(JSON.stringify(msg))
  getMessage(msgObj.message[1].text).then((res) => {
    console.log(res)
  })
  // msg.reply(res.data.choices[0].message, false)
  return
  if (msgObj.message[0].type === 'at') {
    console.log(msgObj)
    const res = instance({
      method: 'post',
      data: JSON.stringify({
        messages: [{ role: 'user', content: msgObj.message[1].text }],
        model: 'gpt-3.5-turbo',
        max_tokens: 1024,
        top_p: 1,
        n: 1,
        stream: false,
      }),
    })

    msg.reply(res.data.choices[0].message, false)
    // openaiMain()
  }
}
