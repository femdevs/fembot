const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, Embed } = require('discord.js');
const { messageExecute } = require('./announce');

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
            await interaction.reply({ embeds: [embed] });
        } else {
            const embed = new EmbedBuilder()
                .setTitle('Success!')
                .setDescription(`${member} was successfully muted for ${duration}`)
            await interaction.reply({ embeds: [embed] });
            member.timeout(60_000);
        }
    },
    async messageExecute(client, message) {
        const member = message.content[0];
        const duration = message.content[1];

        console.log(member, '|', duration); // trying to split on words but im being silly :smile~1:

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
            member.timeout(60_000);
        }
    }
}