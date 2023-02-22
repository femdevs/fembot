const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('alstolfo')
        .setDescription('Take a guess'),
    async execute(client, interaction) {
        const { astolfo } = require('../online_assets.json')
        const selection = Math.floor(Math.random() * astolfo.length);
        await interaction.reply(astolfo[selection]);
    }
}