const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType, GuildMember } = require('discord.js');

module.exports = {
    name: 'timeout',
    type: {
        command: true,
        text: true
    },
    triggers: ['timeout', 'mute'],
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
        .addStringOption(option =>
            option
                .setName('timeframe')
                .setDescription('Choose whether to mute a member in minutes, hours, or days.')
            )
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers),
    channelLimits: [
        ChannelType.GuildText,
    ],
    async execute(client, interaction) {
        const member = interaction.options.getMember('member');
        const duration = interaction.options.getInteger('duration');

        const error_embed = new EmbedBuilder()
            .setTitle('Error')
            .setDescription('I was unable to mute that member.')

        if (member.user === interaction.user) {
            const embed = new EmbedBuilder()
                .setTitle('Whoops!')
                .setDescription('You can\'t mute yourself!')
            await interaction.reply({ embeds: [embed] });
        } else if (member.user === client.user) {
            const embed = new EmbedBuilder()
                .setTitle('Whoops!')
                .setDescription('I can\'t mute myself!')
            await interaction.reply({ embeds: [embed] });
        } else {
            const embed = new EmbedBuilder()
                .setTitle('Success!')
                .setDescription(`${member} was successfully muted for ${duration}`)
            await interaction.reply({ embeds: [embed] });
            member.disableCommunicationUntil(new Date(Date.now() + 60_000)).catch(err => interaction.followUp({ embeds: [error_embed] }))
        }
    },
    async messageExecute(client, message, args) {
        const member = message.mentions.members.first();
        if (!(member instanceof GuildMember)) return message.reply('Invalid member!');
        const duration = args[1];

        const error_embed = new EmbedBuilder()
            .setTitle('Error')
            .setDescription('I was unable to mute that member.')

        if (member === message.author) {
            const embed = new EmbedBuilder()
                .setTitle('Whoops!')
                .setDescription('You can\'t mute yourself!')
            await message.reply({ embeds: [embed] });
        } else if (member === client.user) {
            const embed = new EmbedBuilder()
                .setTitle('Whoops!')
                .setDescription('I can\'t mute myself!')
            await message.reply({ embeds: [embed] });
        } else {
            const embed = new EmbedBuilder()
                .setTitle('Success!')
                .setDescription(`${member} was successfully muted for ${duration}`)
            await message.reply({ embeds: [embed] });
            member.disableCommunicationUntil(new Date(Date.now() + 60_000)).catch(err => message.reply({ embeds: [error_embed] }));
        }
    }
}