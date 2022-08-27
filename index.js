const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: 
    [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] 
});

client.once('ready', () => {
	console.log('EEE PSSU!');
});

client.on('voiceStateUpdate', (_, newState) => {   
    const userId = newState.member.id;
    if (newState.channelId !== null && userId === '427158944943702028') {
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