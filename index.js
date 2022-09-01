const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences] 
});

const usersId = [
	/* '427158944943702028' */
];

const GODsId = [
    '391706479872442368',
    '331776183324770305'
];

client.once('ready', () => {
    client.user.setStatus('invisible');
	console.log('laplace...oh!');
});

client.on('voiceStateUpdate', (_, newState) => {   
    const userId = newState.member.id;
    if (newState.channelId !== null && usersId.includes(userId)) {
        newState.disconnect();
        console.log('Laplace aggisce...');
    }
});

client.on('voiceStateUpdate', (oldState, newState) => {
    const userId = newState.member.id;
    if (GODsId.includes(userId)) {
        if (!oldState.serverMute && newState.serverMute) {
            newState.setMute(false);
        } else if (!oldState.serverDeaf && newState.serverDeaf) {
            newState.setDeaf(false);
        }
    }
});

/*
client.on('voiceStateUpdate', (oldState, newState) => {
    if ((oldState.mute && !newState.mute) && newState.member.id === '498139857776803842') {
        newState.setMute();
    }
});
*/

client.on('messageCreate', (msg) => {
    if (usersId.includes(msg.author.id)) {
        msg.delete();
    }
});

/*
client.on('voiceStateUpdate', async (oldState, newState) => {
    const userId = newState.member.id;
    if ((oldState.channelId && newState.channelId) && GODsId.includes(userId)) {
        const logs = await newState.guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.MemberMove
        });

        const log = logs.entries.first();

        if (log) {
            const { executor } = log; 
            if (!executor.bot) {
                await newState.setChannel(oldState.channel);
            }
        }
        newState.setChannel(oldState.channel);
    }
});
*/

client.login(token);