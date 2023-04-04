const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, Embed } = require('discord.js');

module.exports = {
    name: 'timeout',
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeout (mute) a member.')
        .addUserOption(option =>
            option
                .setName('member')
                .setDescription('Choose who to mute.')
                .setRequired(true))
        .addIntegerOption(option =>
            option
                .setName('duration')
                .setDescription('How long to mute the user for.')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers),
    async execute(client, interaction) {
        const member = interaction.options.getUser('member');
        const duration = interaction.options.getInteger('duration');

        if (member === interaction.user) {
            const embed = new EmbedBuilder()
                .setTitle('Whoops!')
                .setDescription('You can\'t mute yourself!')
            await interaction.reply({ embeds: [embed] });
        } else if (member === client.user) {
            const embed = new EmbedBuilder()
                .setTitle('Whoops!')
                .setDescription('I can\'t mute myself!')
            await interaction.reply({ embeds: [embed] })
        } else {
            const embed = new EmbedBuilder()
                .setTitle('Success!')
                .setDescription(`${member} was successfully muted for ${duration}`)
            await interaction.reply({ embeds: [embed] })
        }
    }
}