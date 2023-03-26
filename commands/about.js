const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'about',
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('About the bot'),
    async execute(client, interaction) {
        const embed = new EmbedBuilder()
            .setTitle('About the bot')
            .setDescription
    }
}