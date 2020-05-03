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

    let members2 = await slack.conversations.members ({
      channel: 'C012YGSHMFD',
    })

    let channelMembers = members['members'];
    const testing = members2['members'];
    let memberInfo = {}
    let user;

    let pairedMembers = {};
    let pairIndex, i;

    console.log(testing)

    // while (channelMembers.length != 0) {
    //   i = channelMembers.length - 1;
    //   pairIndex = Math.floor(Math.random()*i);
    //   pairedMembers[channelMembers[i]] = channelMembers[pairIndex];
    //   pairedMembers[channelMembers[pairIndex]] = channelMembers[i];
    //   channelMembers.splice(i, 1);
    //   channelMembers.splice(pairIndex, 1);
    // }

    console.log(testing)
    testing.forEach(async (value) => {
      user = await slack.users.profile.get({
        user: value,
      })
      // console.log(user)
      memberInfo[value] = await user['profile'];
      // console.log(memberInfo[value]);
  
    })
    Object.keys(pairedMembers).forEach(async member => {
      message = memberInfo[pairedMembers[member]]
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

    res.send(memberInfo)
})

app.listen(port, () => console.log('Example app listening at http://localhost:${port}'))
