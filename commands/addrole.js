const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'addrole',
    type: {
        command: true,
        text: false
    },
    data: new SlashCommandBuilder()
        .setName('addrole')
        .setDescription('Add a role to a user.')
        .addUserOption(option => 
            option
                .setName('member')
                .setDescription('The user to add the role to')
                .setRequired(true))
        .addRoleOption(option =>
            option
                .setName('role')
                .setDescription('The role to add to the user')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
    async execute(client, interaction) {
        const member = interaction.options.getMember('member');
        const role = interaction.options.getRole('role');

        try {
            const embed = new EmbedBuilder()
                .setTitle('Success!')
                .setDescription(`${member} has been given the role ${role}.`)
                .setColor(0x3dd11b)
            await member.roles.add(role);
            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            const error_embed = new EmbedBuilder()
                .setTitle('Error')
                .setDescription(`It seems we encountered an error:\n\`${error}\``)
                .setColor(0xd1271b)
            await interaction.reply({ embeds: [error_embed] })
            console.error(error);
        }
    }
}