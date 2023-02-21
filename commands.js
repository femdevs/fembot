const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

const commands = [];

const commandFiles = fs
    .readdirSync('./commands')
    .filter(file => file.endsWith('.js'));

for (const file of commandFiles) commands.push(require(`./commands/${file}`).data.toJSON());

const rest = new REST({ version: '10' }).setToken("MTA3NzI0MDMxMTg3NDU5Njk0NQ.GLnGUD.ssM6dK_yhvm_v55yaUtCHsqqhHZaR8HIQ98dIc");

rest.put(Routes.applicationCommands('1077240311874596945'), { body: commands })
    .then(_ => console.log('Successfully registered Global application commands.'))
    .catch(console.error);