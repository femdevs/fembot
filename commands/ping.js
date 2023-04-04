const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    type: {
        command: true,
        text: true
    },
    triggers: ['ping'],
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(client, interaction) {
        await interaction.reply('Pong!');
    },
    async message(client, message) {
        await message.reply('Pong!');
    }
}