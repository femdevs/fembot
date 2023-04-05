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
        //.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('Describe why you are banning the user.')
                .setRequired(false)),
    async execute(client, interaction) {
        const member = interaction.options.getMember('member');
        const reason = interaction.options.getString('reason');

        const embed = new EmbedBuilder()
            .setTitle('Success!')
            .setDescription(`${member} was successfully banned.\n\n**Reason**\n${reason}`)

        if (member === client.user) {console.log('TESTING - I CANT BAN MYSELF')}
        else if (member === interaction.user) {console.log('TESTING - YOU CANT BAN YOURSELF')}
        else {
            try {
                await interaction.guild.members.ban(member, { reason: reason});
                await interaction.reply({ embeds: [embed] })
            } catch (error) {
                const error_embed = new EmbedBuilder()
                    .setTitle('Error')
                    .setDescription(`It seems we encountered an error:\n\`${error}\``)
                await interaction.reply({ embeds: [error_embed], epehmeral: true });
                console.error(error);
            }
        };
    }
}