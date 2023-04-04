const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'stats',
    type: {
        command: true,
        text: true,
    },
    triggers: ['stats'],
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Check how many times you have ran a command!'),
    disabled: true,
}