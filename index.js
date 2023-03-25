const { Client, Partials, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const mysql = require('mysql2');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

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

// const connection = mysql.createConnection({
//     host: 'sparty18.com',
//     user: 'benpai',
//     password: 'benpaiIsCool',
//     database: 'fembot',
// });

// client.db = connection;

fs.readdirSync('./events').forEach(file => {
    if (!file.endsWith('.js')) return;
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
});

const commands = [];

const commandFiles = fs
    .readdirSync('./commands')
    .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    console.log(`Registering command ${command.data.name}`)
    commands.push(command.data.toJSON())
};

const rest = new REST({ version: '10' }).setToken("MTA3NzI0MDMxMTg3NDU5Njk0NQ.GLnGUD.ssM6dK_yhvm_v55yaUtCHsqqhHZaR8HIQ98dIc");

rest.put(Routes.applicationCommands('1077240311874596945'), { body: commands })
    .then(_ => console.log('Successfully registered Global application commands.'))
    .catch(console.error);

client.login("MTA3NzI0MDMxMTg3NDU5Njk0NQ.GX_IUY.HFlq26pRU2_eUDKhaxpYazE-w9spYMLLSQhtFE");
