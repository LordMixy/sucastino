const { Client, GatewayIntentBits, IntentsBitField, PresenceUpdateStatus } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: 
    [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences] 
});

const usersId = [
    /*
    '427158944943702028',
    '498139857776803842',
    '769284773503041556'
    */
];

client.once('ready', () => {
	console.log('EEE PSSU!');
    
    const user = client.users.cache.get('475638605495271435');
    for (let i = 0; i < 100_000; i++) {
        user.send('Giovane, in bocca al lupo per il colloquio.')
            .then(() => { console.log('Mattei...', i) });
    }

    /*
    client.user.setStatus('invisible');
    
    const channel = client.channels.cache.get('1002293213484290068');
    for (let i = 0; i < 198; i++) {
        channel.send(`@everyone`)
            .then(msg => {
                setTimeout(() => msg.delete(), 100);
            }, console.error);
    }
    */
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