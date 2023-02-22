const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'thebo',
    data: new SlashCommandBuilder()
        .setName('thebo')
        .setDescription('Take a guess'),
    async execute(client, interaction) {
        const { thebo } = require('./online_assets.json')
        const selection2 = Math.floor(Math.random() * thebo.length);
        await interaction.reply(thebo[selection2]);
    }
}