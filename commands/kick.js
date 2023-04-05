const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'kick',
    type: {
        command: true,
        text: false
    },
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a member from the server.')
        .addUserOption(option =>
            option
                .setName('member')
                .setDescription('Choose who to kick from the server.')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('Describe why you are kicking this member.')
                .setRequired(false)),
    async execute(client, interaction) {
        const user = interaction.options.getMember('member');
        const reason = interaction.options.getString('reason');

        if (user.id === interaction.user.id) {
            const embed = new EmbedBuilder()
                .setTitle('Whoops!')
                .setDescription('You can\'t kick yourself!')
                .setColor(0xd1271b)
            await interaction.reply({ embeds: [embed] });
        } else if (user.id === client.user.id) {
            const embed = new EmbedBuilder()
                .setTitle('Whoops!')
                .setDescription('I can\'t kick myself!')
                .setColor(0xd1271b)
            await interaction.reply({ embeds: [embed] });
        } else {
            const success_embed = new EmbedBuilder()
                .setTitle('Success!')
                .setDescription(`${user} was kicked from ${interaction.guild.name}.\n\n**Reason**\n${reason}`)
                .setColor(0x3dd11b)
            await user.kick({ reason: reason });
            await interaction.reply({ embeds: [success_embed] });
        }
    }
}