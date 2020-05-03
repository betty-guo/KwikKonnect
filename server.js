require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const { WebClient } = require('@slack/web-api');
const slack = new WebClient(process.env.SLACK_KEY)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/info', async (req, res) => {
  // basic info about KiwkKonnect
  res.send("Hey there, I'm KwikKonnect! I'm here to help you meet new people and stay connected, even when you're remote.\n"
    + "If you're a team member, join the #kwikkonnect channel to join in the fun! I'll notify you of matches every week, held through 2min video calls on the KiwkKonnect video platform.\n"
    + "If you're a team owner, use /match to begin the matching process!");
})

app.post('/match', async (req, res) => {
    // getting channel members
    let channelMembers = await slack.conversations.members ({
      channel: 'C012YGSHMFD', // #kiwkkonnect channel
    })

    // pairing up channel members
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

    // sending match messages
    let user;
    Object.keys(pairedMembers).forEach(async member => {
      user = await slack.users.profile.get({
        user: pairedMembers[member],
      })
      message = user['profile']['real_name'] + " is your KwikKonnect match! Here's how they're doing right now: " + user['profile']['status_text'] + "\n"
      message += "Your 5min video call is scheduled for 12pm at www.kwikkonnect.online.\n"
      message += "Have fun! :relaxed:"
      await slack.chat.postMessage({
        channel: member,
        text: message,
      })
    })

    res.send("Everyone in #kwikkonnect was matched up!")
})

const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});
