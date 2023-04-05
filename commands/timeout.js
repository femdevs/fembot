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
        .addStringOption(option =>
            option
                .setName('duration')
                .setDescription('How long to mute the user for.')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers),
    channelLimits: [
        ChannelType.GuildText,
    ],
    async execute(client, interaction) {
        const member = interaction.options.getMember('member');
        const duration = interaction.options.getString('duration');
        const durationTime = client.Utils.Time.stringToMilliseconds(duration);
        const durationFormatted = client.Utils.Time.elapsedTime(durationTime/1000);

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
                .setDescription(`${member} was successfully muted for ${durationFormatted}`)
            await interaction.reply({ embeds: [embed] });
            member.disableCommunicationUntil(new Date(Date.now() + durationTime)).catch(err => interaction.followUp({ embeds: [error_embed] }))
        }
    },
    /**
     * 
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').Message} message 
     * @param {Array<string | null>} args 
     * @returns 
     */
    async messageExecute(client, message, args) {
        const member = message.mentions.members.first();
        if (!(member instanceof GuildMember)) return message.reply('Invalid member!');
        const duration = client.Utils.Time.stringToMilliseconds(args.join(' '));
        const durationFormatted = client.Utils.Time.elapsedTime(duration/1000);

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
                .setDescription(`${member} was successfully muted for ${durationFormatted}`)
            await message.reply({ embeds: [embed] });
            member.disableCommunicationUntil(
                new Date(
                    Date.now() + duration
                )
            ).catch(
                err =>
                    message.reply(
                        {
                            embeds: [error_embed]
                        }
                    )
            );
        }
    }
}