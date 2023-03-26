const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'about',
    data: new SlashCommandBuilder()
        .setName('About the bot')
        .setDescription('Take a guess'),
    async execute(client, interaction) {
        await interaction.reply('Pong!');
    }
}