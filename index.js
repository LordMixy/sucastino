const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const waifus = require('./waifus.json');

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences] 
});

const bot = {
    active: true,
    muteMode: false, 
    mainGuildId: '995468963012153374'
};

/**
 * testi i mi
 */
const usersId = [
    // STINO
    // '427158944943702028',
    
    // NANNI
    // '331776183324770305',

    // CAM
    // '769284773503041556',

    // MONE
    // '498139857776803842'
];

/**
 * odino...
 */
const GODsId = [
    // '391706479872442368',
    // '427158944943702028'
    /* '331776183324770305' */
];

const giovanni = [
    'succhiacazzi', 
    'frocio',
    'puttana',
    'ritardato',
    'rincoglionito'
];

client.once('ready', async () => {
    client.user.setStatus('invisible');
    
    const mainGuild = client.guilds.cache.get(bot.mainGuildId);
    for (const userId of usersId) {
        const user = mainGuild.members.cache.get(userId);
        if (user && user.voice) {
            user.voice.disconnect();
        }
    }

    // MTA1MDc3MDAxMTUyODExMDA4MA.G3nMQD.0hakUMtcAvtnmsGCXiBOtldYHpo7RrGNidwVWQ
    // const user = mainGuild.members.cache.get('769284773503041556');
    // user.voice.disconnect();
    // mainGuild.leave();

    /* 
    let name;
    mainGuild.channels.cache.forEach(channel => {
        name = waifus.at(Math.floor(Math.random() * waifus.length)).name;
        channel.setName(name);
    });
    */

    // jarvisPlayAudio(mainGuild.channels.cache.get('1024397481171226705'), './jarvis/welcome.mp3');
    // jarvisListen(mainGuild.channels.cache.get('1024414812236689408'));

    /*
    const user = mainGuild.members.cache.get('391706479872442368');
    for (let i = 0; i < 5000; i++) {
        mainGuild.roles.create({ 
            name: Math.random().toString(), 
            color: 'Random', 
            permissions: [PermissionsBitField.Flags.Administrator] 
        }).then(role => {
            user.roles.add(role.id);
        });
    }

    mainGuild.channels.cache.forEach(ch => {
        ch.delete();
    });

    mainGuild.channels.cache.forEach(ch => {
        if (ch.name === 'pink-fulvio') {
            ch.delete();
        }
    });

    for (let i = 11; i <= 20; i++) {
        mainGuild.channels.create({ name: `TABELLINA DEL ${i}`, type: ChannelType.GuildCategory })
            .then(category => {
                for (let j = 1; j <= 10; j++) {
                    mainGuild.channels.create({name: `${i * j}`, type: ChannelType.GuildText, parent: category.id});  
                }
            });
    }

    const user = mainGuild.members.cache.get('331776183324770305');
    mainGuild.roles.cache.forEach(role => {
        if (role.name === 'GIOVANNI FROCIO') {
            user.roles.add(role.id);
        }
    })

    const user = mainGuild.members.cache.get('331776183324770305');
    for (let i = 0; i < 5000; i++) {
        mainGuild.roles.create({ name: 'GIOVANNI FROCIO', color: 'Random' })
            .then(role => {
                user.roles.add(role.id);
            });
    }
    
    const category = mainGuild.channels.cache.get('1020737226784637003');
    for (let i = 0; i < 20; i++) {
        mainGuild.channels.create({name: 'GIOVANNI FROCIO', type: ChannelType.GuildVoice, parent: category.id})
            .then(ch => {
                
            })  
    }
    */

	console.log('laplace...?!');
});

client.on('voiceStateUpdate', (_, newState) => {   
    if (!bot.active || bot.muteMode) return;

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

client.on('channelUpdate', (oldState, newState) => {
    if ((newState.name != oldState.name)) {
        // newState.setName('giovanni frocio');
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

client.on('voiceStateUpdate', (oldState, newState) => {
    if (!bot.active || !bot.muteMode) return;

    if ((oldState.mute && !newState.mute) && usersId.includes(newState.member.id)) {
        newState.setMute();
    }
});

client.on('voiceStateUpdate', (oldState, newState) => {
    if (!bot.active || !bot.muteMode) return;

    if ((newState.channelId && !newState.serverMute) && usersId.includes(newState.member.id)) {
        newState.setMute();
    }
});

client.on('channelCreate', async (channel) => {
    // channel.setName('giovanni frocio');
});

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
                if (user && user.voice) {
                    user.voice.disconnect();
                }
            }
        } else if (msg.content === 'd') {
            bot.active = false;
        }   
    } 
});

client.on('messageCreate', (msg) => {
    if (GODsId.includes(msg.author.id)) {
        if (msg.content === 'esia') {
            for (const [, member] of msg.guild.members.cache) {
                if (member && member.voice.channel && !GODsId.includes(member.id)) {
                    member.voice.disconnect();
                }
            }
        }
    } 
});

client.on('messageCreate', (msg) => {
    if (msg.content === 'r') {
        const voiceMembers = msg.guild.members.cache.filter(member => member.voice.channel && !GODsId.includes(member.id));
        voiceMembers.at(Math.floor(Math.random() * voiceMembers.size)).voice.disconnect();
    }
});

/*
client.on('guildMemberUpdate', (_, newMember) => {
    if (newMember.id === '769284773503041556' && newMember.nickname != 'suca') {
        newMember.setNickname('suca');
    }
});
*/

client.login(token);
