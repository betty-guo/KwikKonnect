require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const { WebClient } = require('@slack/web-api');
const slack = new WebClient(process.env.SLACK_KEY)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.post('/', function (req, res) {
  // var headers = {
  //   'Content-Type': 'application/json',
  //   'Authorization': 'Bearer xoxp-1124198854688-1093628893830-1113059782897-94ebad573a234d91aa2d07ec8491f0dd'
  // }
  //
  // var options = {
  //   uri: "https://slack.com/api/chat.postMessage",
  //   method: 'POST',
  //   headers: headers,
  //   json: true,
  //   body: {
  //     text: 'Hello, world!',
  //     channel: 'C012YGSHMFD'
  //   }
  // }
    slack.chat.postMessage({
      channel: 'U012HJHFX9V',
      text: "Hello!",
    })
    slack.chat.postMessage({
      channel: 'U012HNJ6T63',
      text: "Hello!",
    })
    slack.chat.postMessage({
      channel: 'U012RJGS9QE',
      text: "Hello!",
    })
    slack.chat.postMessage({
      channel: 'U012YJ92ACT',
      text: "Hello!",
    })
    slack.chat.postMessage({
      channel: 'U0134FW95J8',
      text: "Hello!",
    })
    slack.chat.postMessage({
      channel: 'U013N5V6HLY',
      text: "Hello!",
    })
    res.sendStatus(200)
})

const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});
