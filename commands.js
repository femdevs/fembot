const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
require('dotenv').config();

const { TOKEN: token } = process.env;

const commands = [];

const commandFiles = fs
    .readdirSync('./commands')
    .filter(file => file.endsWith('.js'));

for (const file of commandFiles) commands.push(require(`./commands/${file}`).data.toJSON());

const coreRest = new REST({ version: '10' }).setToken(token);

coreRest
    .put(Routes.applicationCommands('1077240311874596945'), { body: commands })
    .then(_ => console.log('Successfully registered Global application commands.'))
    .catch(console.error);