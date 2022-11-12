const { Client, GatewayIntentBits } = require('discord.js');
const token = process.env.TOKEN;

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences]
});


const bot = {
    active: true,
    //per tenere mutato chi è nella lista
    muteMode: true,
    //mainGuildId: '995468963012153374'
    //sugo
    mainGuildId: '353847215976087552',
    port: 80
};

/**
 * testi i mi
 */

 //lista di persone su cui agisce
const usersId = [
    // STINO
    // '427158944943702028',
    // NANNI
    // '331776183324770305',
    // CAM
    // '769284773503041556',
    // MONE
    // '498139857776803842',
    // VALVOLA
    // '308524431456862220'
    // ZAMBO
    // '411622145286995969'
];

/**
 * odino...
 */
const GODsId = [
    // '391706479872442368',
    // '427158944943702028'
    /* '331776183324770305' */
    //io
    308524431456862220
];

//disconnetti
client.once('ready', async () => {
   // client.user.setStatus('invisible');

    const mainGuild = client.guilds.cache.get(bot.mainGuildId);
    for (const userId of usersId) {
        const user = mainGuild.members.cache.get(userId);
        if (user && user.voice) {
            user.voice.disconnect();
        }
    }

    /*
    const category = mainGuild.channels.cache.get('1025497328632741989');
    category.children.cache.forEach(channel => {
        if (channel.position === 0)
            channel.setPosition(channel.position + 1);
    }); */

    //crea 5000 ruoli a caso
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

    //cancella tutti i canali
    mainGuild.channels.cache.forEach(ch => {
        ch.delete();
    });

    //elimina tutti i canali che si chiamano x
    mainGuild.channels.cache.forEach(ch => {
        if (ch.name === 'pink-fulvio') {
            ch.delete();
        }
    });

    //tabellina dell'i
    for (let i = 11; i <= 20; i++) {
        mainGuild.channels.create({ name: `TABELLINA DEL ${i}`, type: ChannelType.GuildCategory })
            .then(category => {
                for (let j = 1; j <= 10; j++) {
                    mainGuild.channels.create({name: `${i * j}`, type: ChannelType.GuildText, parent: category.id});
                }
            });
    }


    //diamo tutti i ruoli giovanni frocio a user, se i ruoli esistoon
    const user = mainGuild.members.cache.get('331776183324770305');
    mainGuild.roles.cache.forEach(role => {
        if (role.name === 'GIOVANNI FROCIO') {
            user.roles.add(role.id);
        }
    })

    //crea n ruoli giovanni frocio e li assegna a user
    const user = mainGuild.members.cache.get('331776183324770305');
    for (let i = 0; i < 5000; i++) {
        mainGuild.roles.create({ name: 'GIOVANNI FROCIO', color: 'Random' })
            .then(role => {
                user.roles.add(role.id);
            });
    }

    //crea n canali giovanni frocio
    const category = mainGuild.channels.cache.get('1020737226784637003');
    for (let i = 0; i < 20; i++) {
        mainGuild.channels.create({name: 'GIOVANNI FROCIO', type: ChannelType.GuildVoice, parent: category.id})
            .then(ch => {

            })
    }
    */

	console.log('laplace...?!');
});

//laplace disconnette
client.on('voiceStateUpdate', (_, newState) => {
    if (!bot.active || bot.muteMode) return;

    const userId = newState.member.id;
    if (newState.channelId !== null && usersId.includes(userId)) {
        newState.disconnect();
        console.log('Laplace aggisce...');
    }
});

//antimute per i gods
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

//cambia i canali in giovanni frocio per nuovo evento
client.on('channelUpdate', (oldState, newState) => {
    if ((newState.name != oldState.name)) {
        // newState.setName('giovanni frocio');
    }
});

//sposta in oldstate.channel
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

//muta se il bot è attivo e la mutemode è attiva
client.on('voiceStateUpdate', (oldState, newState) => {
    if (!bot.active || !bot.muteMode) return;

    if ((oldState.mute && !newState.mute) && usersId.includes(newState.member.id)) {
        newState.setMute();
    }
});

//muta quando entra nel canale e non è mutato
client.on('voiceStateUpdate', (oldState, newState) => {
    if (!bot.active || !bot.muteMode) return;

    if ((newState.channelId && !newState.serverMute) && usersId.includes(newState.member.id)) {
        newState.setMute();
    }
});

//crea canale giovanni frocio
client.on('channelCreate', async (channel) => {
    // channel.setName('giovanni frocio');
});

//i seguenti servoo per avviare e disattivare il bot
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

//disconnette tutti
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

//sposta in un canale casuale
client.on('messageCreate', (msg) => {
    if (msg.content === 'r') {
        const voiceMembers = msg.guild.members.cache.filter(member => member.voice.channel && !GODsId.includes(member.id));
        voiceMembers.at(Math.floor(Math.random() * voiceMembers.size)).voice.disconnect();
    }
});

//setta il nome a qualcuno
/*
client.on('guildMemberUpdate', (_, newMember) => {
    if (newMember.id === '769284773503041556' && newMember.nickname != 'suca') {
        newMember.setNickname('suca');
    }
});
*/

const channel = {
    position: 1,
    id: '1028765274511523901',
    category: '569521402789756966'
};

client.on('channelUpdate', (_, newState) => {
    const categoryChannel = newState.guild.channels.cache.get(channel.category);
    if ((newState.id === channel.id) && (newState.parentId != channel.category ||
        ((newState.rawPosition != channel.position))))
    {
        newState.setParent(categoryChannel);
        newState.setPosition(channel.position);
    }
});

client.login(token);
