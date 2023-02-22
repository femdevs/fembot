const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Take a guess'),
    async execute(client, interaction) {
        await interaction.reply('Pong!');
    }
}