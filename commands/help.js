const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'help',
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Take a guess'),
    async execute(client, interaction) {
        await interaction.reply('Commands: !help, !astolfo, !thebo, !thegoods');
    }
}