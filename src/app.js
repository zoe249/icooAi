const { createClient } = require('icqq')
const { instance } = require('./request/index')
const account = 2842066125
const password = 'qq1421759951'

const client = createClient({
  account: account,
  platform: 4,
  ver: '2.1.7',
  sign_api_addr: 'http://127.0.0.1:9090/',
})
const OnMessageReceive = require('../plugins/message.js').OnMessageReceive

// const getMessage = (content) => {
//   return new Promise((resolve, reject) => {
//     const res = instance({
//       method: 'post',
//       data: JSON.stringify({
//         messages: [{ role: 'user', content: content }],
//         model: 'gpt-3.5-turbo',
//         max_tokens: 1024,
//         top_p: 1,
//         n: 1,
//         stream: false,
//       }),
//     })

//     resolve(res.data)
//   })
// }
client.on('system.online', () => console.log('Logged in!'))
// client.on('message', OnMessageReceive)
client.on('message', async function (msg) {
  const msgObj = JSON.parse(JSON.stringify(msg))
  // console.log(msgObj)
  if (msgObj.message[0].type === 'at' && msgObj.message[0].qq === account) {
  }
  if (msgObj.raw_message.split(' ')[0] === '@赵城王') {
    const res = await instance({
      method: 'post',
      data: JSON.stringify({
        messages: [{ role: 'user', content: msgObj.raw_message.split(' ')[1] }],
        model: 'gpt-3.5-turbo',
        max_tokens: 1024,
        top_p: 1,
        n: 1,
        stream: false,
      }),
    })
    console.log(res.data.choices[0].message)
    msg.reply(res.data.choices[0].message.content)
  }
})

client.on('system.login.slider', (e) => {
  console.log('输入滑块地址获取的ticket后继续。\n滑块地址:    ' + e.url)
  process.stdin.once('data', (data) => {
    client.submitSlider(data.toString().trim())
  })
})
client.on('system.login.qrcode', (e) => {
  console.log('扫码完成后回车继续:    ')
  process.stdin.once('data', () => {
    client.login()
  })
})
client.on('system.login.device', (e) => {
  console.log('请选择验证方式:(1：短信验证   其他：扫码验证)')
  process.stdin.once('data', (data) => {
    if (data.toString().trim() === '1') {
      client.sendSmsCode()
      console.log('请输入手机收到的短信验证码:')
      process.stdin.once('data', (res) => {
        client.submitSmsCode(res.toString().trim())
      })
    } else {
      console.log('扫码完成后回车继续：' + e.url)
      process.stdin.once('data', () => {
        client.login()
      })
    }
  })
})
client.login(account, password)

// module.exports = {
//   openaiMain
// }
