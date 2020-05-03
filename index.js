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
    let user;

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
      user = await slack.users.profile.get({
        user: pairedMembers[member],
      })
      message = user['profile']['real_name'] + " is your KwikKonnect match! Here's how they're doing right now: " + user['profile']['status_text'] + "\n"
      message += "Your 5min video call is scheduled for 12pm @ ourdomain.com/xyz. Have fun! :relaxed:"
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

    res.send("Everyone in #kwikkonnect was matched up!")
})

app.listen(port, () => console.log('Example app listening at http://localhost:${port}'))
