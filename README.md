<a href="https://slack.com/oauth/v2/authorize?client_id=1124198854688.1098998323013&scope=channels:history,channels:read,chat:write,commands,im:write,incoming-webhook,pins:read,reactions:read,users:read,groups:read,users.profile:read"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"></a>

# KwikKonnect

## Inspiration
With COVID-19 impacting many social and organizational aspects of everyday life, we wanted to develop something that would mitigate the loneliness of social isolation and allow users to stay engaged within their teams and friend groups despite remote work. Thus, we designed KwikKonnect, a Slack bot and video call web platform which facilitates spontaneous video calls within groups, Through KwikKonnect, remote teams can stay form new bonds and stay connected, quickly and accessibly online. KwikKonnect has usages for remote coffee chats and off-site socials as well as more rapid-paced networking events.


## What it does
**The Bot**

kwikbot is a Slack bot which pairs users in a Slack team for short video calls. Once added, the team owner can configure the duration and frequency of the video calls, with defaults of 10 minutes and 24 hours respectively. The bot then pairs up team members who have joined the #kwikkonnect channel and sends them unique, randomly-generated links which redirect the users to a short, closed video call. 
After a certain number of matchmaking rounds, the bot targets pairs of team members with low chat traffic in the hopes of increasing interactions and bringing them closer together. If chat interactions between all possible pairs of group members within the team are roughly equal, the bot will revert to pairing random team members.

**The Video Call**

The peer-to-peer connected video calls are hosted on KwikKonnect.online with a simple, aesthetically-pleasing user interface and last as long as the configured duration. Features include randomly-generated conversation prompts and an option to extend the duration of the call. For the purposes of facilitating conversation, closing the tab or ending the call before the duration is complete is disabled.


## How we built it
The backend server for kwikbot was built in JavaScript using Express and Node as well as the Slack Node SDK, and deployed to Google Cloud.
The KwikKonnect video call web platform was built with WebRTC through Simple-Peer for peer-to-peer video calling and socket.io to initiate video calls. The platform uses Node and Express in JavaScript and is hosted through Domain.com.


## Challenges we ran into
Coming into the hackathon with no experience with P2P platforms, slack bots, or even Node.js, we faced several challenges in developing our hack. Initially, we faced challenges setting up the backend for kwikbot to respond to slash commands through POST requests. As well, it was difficult to set up a connection between two clients on separate devices & locations on our video calling platform. Later, we also faced challenges with deploying our Express servers using GDP and hosting on domain.com. As well, we had some difficulty styling our web platform for a cohesive design across different devices. We're extremely proud that we were able to overcome all these challenges through collaboration and a lot of stack overflow.
We also had some difficulty hacking as a team remotely, but found success in video calls and as we completed development, even using KwikKonnect itself!


## Accomplishments that we're proud of
Between the Slack bot, Slack backend, web platform frontend, and web platform backend, there were a lot of different parts that went into this hack, and we're super proud we were able to make them all work together. We're also really happy to have created a hack that we truly believe can make a positive impact during and after COVID-19 as many people work remotely.


## What we learned
Over the course of this hackathon, we learned a ton about Node, deployment, styling, and Slack, all over the course of less than 24h.


## What's next for KwikKonnect
In the future, we hope to expand KwikKonnect to other popular platforms such as Discord to further facilitate conversations between others and bring the world closer together from the safety of their own homes. As well, we hope to add additional features to kwikbot such as statistics and analytics about the number of calls that you have had and who you've met with. Finally, we hope to further refine our video calling platform to incorporate additional features such as AR filters.
