const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const { WebClient } = require('@slack/web-api');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.post('/', async (req, res) => {
  // var headers = {
  //   'Content-Type': 'application/json',
  //   'Authorization': 'Bearer xoxb-1124198854688-1099012539237-kARJEPLEMg8eBEWUXFRTMBlR'
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
    let members = await slack.conversations.members ({
      channel: 'C012YGSHMFD',
    })

    let channelMembers = members['members'];
    let memberInfo = {}

    channelMembers.forEach(async (value) => {
      memberInfo[value] = await slack.users.profile.get({
        user: value,
      })
      console.log(memberInfo[value]);
    })
    console.log(memberInfo);
    let pairedMembers = {};
    let pairIndex, i;

    while (channelMembers.length != 0) {
      i = channelMembers.length - 1;
      pairIndex = Math.floor(Math.random()*i);
      pairedMembers[channelMembers[i]] = channelMembers[pairIndex];
      pairedMembers[channelMembers[pairIndex]] = channelMembers[i];
      channelMembers.splice(i, 1);
      channelMembers.splice(pairIndex, 1);
    }

    Object.keys(pairedMembers).forEach(async member => {
      message = memberInfo[pairedMembers[member]]['profile']['real_name'] + " is your KwikKonnect match!"
        await slack.chat.postMessage({
        channel: member,
        text: message,
      })
    })


    // for (i=channelMembers.length - 1; i>= 0; i++) {
    //   pairIndex = Math.floor(Math.random()*i);
    //   pairedMembers[channelMembers[i]] = channelMembers[pairIndex];
    //   pairedMembers[channelMembers[pairIndex]] = channelMembers[i];
    //   channelMembers.splice(i, 1);
    //   channelMembers.splice(pairIndex, 1);
    // }

    // let pairings = {
    // }

    // slack.chat.postMessage({
    //   channel: 'U012HJHFX9V',
    //   text: message,
    // })
    // slack.chat.postMessage({
    //   channel: 'U012HNJ6T63',
    //   text: message,
    // })
    // slack.chat.postMessage({
    //   channel: 'U012RJGS9QE',
    //   text: message,
    // })
    // slack.chat.postMessage({
    //   channel: 'U012YJ92ACT',
    //   text: message,
    // })
    // slack.chat.postMessage({
    //   channel: 'U0134FW95J8',
    //   text: message,
    // })
    // slack.chat.postMessage({
    //   channel: 'U013N5V6HLY',
    //   text: message,
    // })
    res.send(memberInfo)
})

app.listen(port, () => console.log('Example app listening at http://localhost:${port}'))
