const { Client, Partials, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const mysql = require('mysql2');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessageReactions
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.User,
        Partials.GuildScheduledEvent,
        Partials.ThreadMember
    ],
    presence: {
        activities: [
            {
                name: 'with Astolfo and other cute boys'
            }
        ]
    }
});

const staticFiles = {
    theGoods: fs.readFileSync('./the_goods.mp3')
}

client.sfiles = staticFiles;

const connection = mysql.createConnection({
    host: 'sparty18.com',
    user: 'benpai',
    password: 'benpaiIsCool',
    database: 'fembot',
});

client.db = connection;

fs.readdirSync('./events').forEach(file => {
    if (!file.endsWith('.js')) return;
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
});

client.login("MTA3NzI0MDMxMTg3NDU5Njk0NQ.GLnGUD.ssM6dK_yhvm_v55yaUtCHsqqhHZaR8HIQ98dIc");