const  { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'ban',
    type: {
        command: true,
        text: false
    },
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a user from the server.')
        .addUserOption(option =>
            option
                .setName('member')
                .setDescription('Choose who to ban.')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('Describe why you are banning the user.')
                .setRequired(false)),
    async execute(client, interaction) {
        const member = interaction.options.getMember('member');
        const user = interaction.options.getMember('member');
        const reason = interaction.options.getString('reason');

        if (user.id === client.user.id) {
            const embed = new EmbedBuilder()
                .setTitle('Whoops!')
                .setDescription('I can\'t ban myself!')
            await interaction.reply({ embeds: [embed] });
        } else if (user.id === interaction.user.id) {
            const embed = new EmbedBuilder()
                .setTitle('Whoops!')
                .setDescription('You can\'t ban yourself!')
            await interaction.reply({ embeds: [embed] });
        } else {
            try {
                const success_embed = new EmbedBuilder()
                    .setTitle('Success!')
                    .setDescription(`${member} was successfully banned.\n\n**Reason**\n${reason}`)
                await interaction.guild.members.ban(member, { reason: reason});
                await interaction.reply({ embeds: [success_embed] })
            } catch (error) {
                const error_embed = new EmbedBuilder()
                    .setTitle('Error')
                    .setDescription(`It seems we encountered an error:\n\`${error}\``)
                await interaction.reply({ embeds: [error_embed], ephemeral: true });
                return error;
            }
        };
    }
}