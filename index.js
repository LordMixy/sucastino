const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const cron = require('cron');

const client = new Client({ intents: 
    [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences] 
});

const usersId = [
    '427158944943702028'
];

client.once('ready', () => {
    client.user.setStatus('invisible');
	console.log('laplace...oh!');
    
    const user = client.users.cache.get('331776183324770305');
    new cron.CronJob('0 0 13 * * *', () => {
        user.send('Ricordati di accordare la tua chitarra, testa di cazzo!');
    }).start();
});

client.on('voiceStateUpdate', (_, newState) => {   
    const userId = newState.member.id;
    if (newState.channelId !== null && usersId.includes(userId)) {
        newState.disconnect();
        console.log('Laplace aggisce...');
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