const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences] 
});

const bot = {
    active: false,
    mainGuildId: '995468963012153374'
};

/**
 * testi i mi
 */
const usersId = [
	'427158944943702028',
];

/**
 * odino...
 */
const GODsId = [
    '391706479872442368',
    '331776183324770305'
];

client.once('ready', () => {
    client.user.setStatus('invisible');
    
    const mainGuild = client.guilds.cache.get(bot.mainGuildId);
    for (const userId of usersId) {
        const user = mainGuild.members.cache.get(userId);
        if (user.voice) {
            user.voice.disconnect();
        }
    }

	console.log('laplace...?!');
});

client.on('voiceStateUpdate', (_, newState) => {   
    if (!bot.active) return;

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
    const userId = newState.member.id;
    if (usersId.includes(userId)) {
        if (oldState.channelId && newState.channelId) {
            newState.setChannel(oldState.channel);
        }
    }
});
*/

/* TODO CONDIZIONE UNICA 

client.on('voiceStateUpdate', (oldState, newState) => {
    if (!bot.active) return;

    if ((oldState.mute && !newState.mute) && usersId.includes(newState.member.id)) {
        newState.setMute();
    }
});

client.on('voiceStateUpdate', (oldState, newState) => {
    if (!bot.active) return;

    if ((newState.channelId && !newState.serverMute) && usersId.includes(newState.member.id)) {
        newState.setMute();
    }
});

*/

client.on('messageCreate', (msg) => {
    if (!bot.active) return;

    if (usersId.includes(msg.author.id)) {
        msg.delete();
    }
});

client.on('messageCreate', (msg) => {
    if (GODsId.includes(msg.author.id)) {
        if (msg.content === 'a') {
            bot.active = true;
            for (const userId of usersId) {
                const user = msg.guild.members.cache.get(userId);
                if (user.voice) {
                    user.voice.disconnect();
                }
            }
        } else if (msg.content === 'd') {
            bot.active = false;
        }   
    } 
    console.log(bot.active);
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