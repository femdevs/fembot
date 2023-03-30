const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'announce',
    data: new SlashCommandBuilder()
        .setName('announce')
        .setDescription('Make an announcement using the bot.')
        .addStringOption(option => 
            option.setName('announcement')
                .setDescription('Text that should be in the announcement.')
                .setRequired(true))
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to send the announcement in.')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers | PermissionFlagsBits.SendMessages),
        
    async execute(client, interaction) {
        const channel = interaction.options.getChannel('channel');
        const announcement = interaction.options.getString('announcement');

        await interaction.reply({content: `Message sent in ${channel}`, ephemeral: true})
        await channel.send(announcement);
    }
}