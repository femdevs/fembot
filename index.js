const { Client, Partials, GatewayIntentBits, REST, Routes } = require('discord.js');
const fs = require('fs');
const chalk = require('chalk')
require('dotenv').config();
const { TOKEN: token } = process.env;

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

client.config = {
    prefix: '$'
}

// const connection = mysql.createConnection({
//     host: 'sparty18.com',
//     user: 'benpai',
//     password: 'benpaiIsCool',
//     database: 'fembot',
// });

// client.db = connection;

const Utils = require('./functions/helperFunctions')
client.Utils = Utils;

fs
    .readdirSync('./events')
    .filter(file => file.endsWith('.js'))
    .forEach(file => {
        const event = require(`./events/${file}`);
        console.log(chalk.bold(`Registering ${chalk.blue("event")} ${chalk.red.underline.italic(event.name)}`));
        if (event.once) {
            client.once(event.name, (...args) => event.execute(client, ...args));
        } else {
            client.on(event.name, (...args) => event.execute(client, ...args));
        }
    });

console.log(chalk.bold(`------`))

const commands = fs
    .readdirSync('./commands')
    .filter(file => file.endsWith('.js'))
    .map(file => {
        const command = require(`./commands/${file}`);
        console.log(chalk.bold(`Registering ${chalk.blue("command")} ${chalk.red.underline.italic(command.data.name)}`));
        return command.data.toJSON();
    });

new REST({ version: '10' })
    .setToken(token)
    .put(
        Routes.applicationCommands('1156992196453605568'),
        { body: commands }
    )
    .then(_ => console.log(chalk.green(`Successfully registered ${chalk.bold.underline.red.italic(commands.length)} application commands.`)))
    .catch(console.error);

client.login(token);
