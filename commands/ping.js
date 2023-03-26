const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Take a guess'),
    async execute(client, interaction) {
        await interaction.reply('Pong!');
    }
}