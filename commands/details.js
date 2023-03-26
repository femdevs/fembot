const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'about',
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('About the bot'),
    async execute(client, interaction) {
        await interaction.reply('Pong!');
    }
}