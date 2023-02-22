const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Take a guess'),
    async execute(client, interaction) {
        await interaction.reply('Commands: !help, !astolfo, !thebo, !thegoods');
    }
}