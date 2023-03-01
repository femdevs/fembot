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
    host: 'db.sparty18.com',
    user: 'benpai',
    password: 'AVNS__2BVPt3oiqjOaWDRnBX',
    database: 'alexbot',
    ssl: {
        ca: fs.readFileSync(process.cwd() + `..\\BenpaiBot\\assets\\ca-certificate.crt`)
    }
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

connection.query(`SELECT * FROM servers`, (err, rows) => {
    if (err) throw err;
    rows.forEach(row => {
        const guild = client.guilds.cache.get(row.guildId);
        const interval = row.meowSpeed;
        const channel = guild.channels.cache.get(row.meowChannelId);
        setInterval(() => {
            channel.send('Meow!');
        }, interval);
    });
})

client.login("MTA3NzI0MDMxMTg3NDU5Njk0NQ.GLnGUD.ssM6dK_yhvm_v55yaUtCHsqqhHZaR8HIQ98dIc");