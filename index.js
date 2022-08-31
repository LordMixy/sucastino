const { Client, GatewayIntentBits, IntentsBitField, PresenceUpdateStatus } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: 
    [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences] 
});

const usersId = [
    '427158944943702028'
];

client.once('ready', () => {
	console.log('laplace...!');
});

client.on('voiceStateUpdate', (_, newState) => {   
    const userId = newState.member.id;
    if (newState.channelId !== null && usersId.includes(userId)) {
        newState.disconnect();
    }
});

client.login(token);
/*
    if (oldState.channelId === null && newState.channelId !== null) {
        console.log('join', userId);
    } else if (oldState.channelId !== null && newState.channelId !== null) {
        console.log('move', userId);
    } else {
        console.log('djoin', userId);        
    }
*/
