const { SlashCommandBuilder } = require('discord.js');
const online_assets = require('../online_assets.json');

const thebo = online_assets.thebo

module.exports = {
    name: 'thebo',
    type: {
        command: true,
        text: true
    },
    triggers: ['thebo'],
    data: new SlashCommandBuilder()
        .setName('thebo')
        .setDescription('THE BO'),
    async execute(client, interaction) {
        await interaction.reply(thebo[Math.floor(Math.random() * thebo.length)]);
    },
    async messageExecute(client, message) {
        await message.reply(thebo[Math.floor(Math.random() * thebo.length)]);
    }
}