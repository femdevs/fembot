const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'thebo',
    data: new SlashCommandBuilder()
        .setName('thebo')
        .setDescription('THE BO'),
    async execute(client, interaction) {
        const { thebo } = require('../online_assets.json')
        const selection2 = Math.floor(Math.random() * thebo.length);
        await interaction.reply(thebo[selection2]);
    }
}