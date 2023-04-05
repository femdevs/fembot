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

        if (member.id === client.user.id) {console.log('TESTING - I CANT BAN MYSELF')}
        else if (member.id === interaction.user.id) {console.log('TESTING - YOU CANT BAN YOURSELF')}
        else {
            try {
            await interaction.guild.members.ban(member, { reason: reason});
            console.log(`TESTING - SUCCESS! ${member} TEST BANNED WITH REASON ${reason}`);
            } catch (error) {
                console.log(error);
            }
        };
    }
}