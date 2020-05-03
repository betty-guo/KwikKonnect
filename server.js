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
  res.send("Hey there, I'm kwikbot! I'm here to help you meet new people and stay connected, even when you're remote.\n"
    + "If you're a team member, join the #kwikkonnect channel to join in the fun! I'll notify you of matches every week, held through 2min video calls on the KiwkKonnect video platform.\n"
    + "If you're a team owner, use /kwikmatch to begin the matching process!");
})

app.post('/duration', async (req, res) => {
  // set the duration for KwikKonnect calls
  res.send("You got it! All KwikKonnect video calls will now be "  + req['body']['text'] + " in length!");
})

app.post('/frequency', async (req, res) => {
  // set the frequency of KwikKonnect matches
  res.send("On it! KwikKonnect matches will now occur every " + req['body']['text'] + "!");
})

app.post('/match', async (req, res) => {
    // getting channel members
    let members = await slack.conversations.members ({
      channel: 'C012YGSHMFD', // #kiwkkonnect channel
    })

    let channelMembers = members['members'];
    let channelCopy = channelMembers.slice(0);

    // pairing up channel members
    let pairedMembers = {};
    let pairs = []
    let pairIndex, i;
    while (channelMembers.length != 0) {
      i = channelMembers.length - 1;
      pairIndex = Math.floor(Math.random()*i);
      let endpoint = Math.floor(Math.random()*1000); 
      pairedMembers[channelMembers[i]] = [channelMembers[pairIndex], endpoint];
      pairedMembers[channelMembers[pairIndex]] = [channelMembers[i], endpoint];
      pairs.push(channelMembers[pairIndex].slice(0));
      pairs.push(channelMembers[i].slice(0));
      channelMembers.splice(i, 1);
      channelMembers.splice(pairIndex, 1);
    }

    // sending match messages
    let user;
    Object.keys(pairedMembers).forEach(async member => {
      user = await slack.users.profile.get({
        user: pairedMembers[member][0],
      })
      
      message = user['profile']['real_name'] + " is your KwikKonnect match! Here's how they're doing right now: " + user['profile']['status_text'] + "\n"
      message += "Your 2min video call is scheduled for 12pm at ourdomain.com/" + pairedMembers[member][1] + ".\n"
      message += "Have fun! :relaxed:"
      await slack.chat.postMessage({
        channel: member,
        text: message,
      })
    })

    // privately relaying the matches to matcher
    res.write("Everyone in #kwikkonnect was matched up! :tada:\nHere are this round's matches: ")
    waiting = pairs.length;
    pairs.reduce(async (promise, elem) => {
      await promise;
      const user = await slack.users.profile.get({
        user: elem
      })
      console.log(elem);
      res.write(user['profile']['real_name']);
      if (waiting%2 == 0) {
        res.write(" & ");
      } else if (waiting != 1) {
        res.write(", ")
      }
      finish();
    }, Promise.resolve());
    
    function finish() {
      waiting --;
      if (waiting == 0) {
        console.log(pairs)
        res.write("\nHappy konnecting!")
        res.end();
      }
    }
    // res.end();

    // console.log(pairs)
    // console.log(resMessage)
    // res.send(resMessage);
    // res.send("Everyone in #kwikkonnect was matched up!")
})

const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});
