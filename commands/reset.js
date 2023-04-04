const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'reset',
    type: {
        command: true,
        text: true
    },
    channelLimits: [
        ChannelType.GuildText,
        ChannelType.GuildVoice,
        ChannelType.GuildAnnouncement
    ],
    triggers: ['reset'],
    requiredPermissions: PermissionFlagsBits.ManageChannels,
    data: new SlashCommandBuilder()
        .setName('reset')
        .setDescription('Reset the channel'),
    async execute(client, interaction) {
        await interaction.reply({ content: 'Resetting...' });
        new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
            const newChannel = interaction.channel.clone();
            interaction.channel.delete();
            newChannel.then(channel => {
                channel.send({ content: 'Channel reset!' });
            })
        })
    },
    async messageExecute(client, message) {
        await message.reply({ content: 'Resetting...' });
        new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
            const newChannel = message.channel.clone();
            message.channel.delete();
            newChannel.then(channel => {
                channel.send({ content: 'Channel reset!' });
            })
        })
    }
}