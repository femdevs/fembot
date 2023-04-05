const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'unban',
    type: {
        command: true,
        text: false
    },
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unban a user from the server.')
        .addUserOption(option =>
            option
                .setName('member')
                .setDescription('Enter the ID of the person you wish to unban.')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(client, interaction) {
        const member = interaction.options.getUser('member');

        const embed = new EmbedBuilder()
            .setTitle('Success!')
            .setDescription(`${member} has been unbanned`)

        try {
            await interaction.guild.members.unban(member);
            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            const error_embed = new EmbedBuilder()
                .setTitle('Error')
                .setDescription(`It seems we encountered an error:\n\`${error}\``)
            await interaction.reply({ embeds: [error_embed], epehmeral: true });
            console.error(error);
        }
    }
}