const { WebClient } = require('@slack/web-api');
const slack = new WebClient('xoxp-1124198854688-1093628893830-1113059782897-94ebad573a234d91aa2d07ec8491f0dd')

module.exports.postLink= (channel, text) => slack.chat.postMessage({channel, text})
