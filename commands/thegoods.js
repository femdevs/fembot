const { SlashCommandBuilder } = require('@discordjs/builders');
const { AttachmentBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('thegoods')
        .setDescription('Take a guess'),
    async execute(client, interaction) {
        const file = new AttachmentBuilder(client.sfiles.theGoods, { name: 'theGoods.mp3' });
        await interaction.reply({ files: [file] });
    }
}