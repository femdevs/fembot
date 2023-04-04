const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
    name: 'thegoods',
    type: {
        command: true,
        text: true
    },
    triggers: ['thegoods'],
    data: new SlashCommandBuilder()
        .setName('thegoods')
        .setDescription('Take a guess'),
    async execute(client, interaction) {
        const file = new AttachmentBuilder(client.sfiles.theGoods, { name: 'theGoods.mp3' });
        await interaction.reply({ content: 'Credit: Benpai', files: [file] });
    },
    async messageExecute(client, message) {
        const file = new AttachmentBuilder(client.sfiles.theGoods, { name: 'theGoods.mp3' });
        await message.reply({ content: 'Credit: Benpai', files: [file] });
    }        
}