import tmi from 'tmi.js';
import { BOT_USERNAME, OAUTH_TOKEN, CHANNEL_NAME, BLOCKED_WORDS } from './constants'

const options = {
	options: { debug: true },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: BOT_USERNAME,
		password: OAUTH_TOKEN
	},
	channels: [ CHANNEL_NAME ]
}

const client = new tmi.Client(options);

client.connect();

client.on('join', (channel) => {
	client.say(channel, `Hey fais moi un !don !`);
})



client.on('message', (channel, userstate, message, self) => {
	if(self) return;
	if(userstate.username === BOT_USERNAME) return;

	if(message.toLowerCase() === '!don') { 
		client.say(channel, `@${userstate.username}, voici mon lien pour me faire des dons : paypal.me/CaillouSS`);
	}

	if(message.toLowerCase() === '!clear' || message.toLowerCase() === '!clearchat') {
		client.clear(channel);
	}

	if(message.toLowerCase() === '!salut') { 
		client.say(channel, `Hey @${userstate.username}, salut à toi !`);
	}

	if(message.toLowerCase() === `!mod @${userstate.username}`) {
		client.mod(channel, userstate['user-id'])
	}

	checkTwicthChat(userstate, message, channel);

});

client.on('ban', (channel, userstate) => {
	client.say(channel, `${userstate.username}, à était banni(e)...`)
});

client.on('clearchat', (channel) => {
	client.say(channel, 'Hop Hop Hop 🧹...')
});


function checkTwicthChat(userstate, message, channel) {
	message = message.toLowerCase();

	let shouldSendMessage = false;
	// Check
	shouldSendMessage = BLOCKED_WORDS.some(blockedWords => message.includes(blockedWords.toLowerCase()));

	if (shouldSendMessage) {
	//Tell him !
	client.say(channel, `@${userstate.username}, message supprimé !`)
	//Delete
	client.deletemessage(channel, userstate.id)
	}

}
	