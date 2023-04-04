const { SlashCommandBuilder } = require('discord.js');

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
        await interaction.reply(require('../online_assets.json').thebo[Math.floor(Math.random() * thebo.length)]);
    },
    async messageExecute(client, message) {
        await message.reply(require('../online_assets.json').thebo[Math.floor(Math.random() * thebo.length)]);
    }
}