const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'reset',
    data: new SlashCommandBuilder()
        .setName('reset')
        .setDescription('Reset the channel'),
        /**
         * @param {import('discord.js').Client} client 
         * @param {import('discord.js').ChatInputCommandInteraction} interaction 
         */
    async execute(client, interaction) {
        const { MessageActionRow, MessageButton } = require('discord.js');
        await interaction.reply({ content: 'Resetting...' });
        new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
            const newChannel = interaction.channel.clone();
            interaction.channel.delete();
            newChannel.then(channel => {
                channel.send({ content: 'Channel reset!' });
            })
        })
    }
}