const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');

module.exports = {
    name: 'whois',
    type: {
        command: true,
        text: false
    },
    data: new SlashCommandBuilder()
        .setName('whois')
        .setDescription('Get information about a user.')
        .addUserOption(option =>
            option
                .setName('member')
                .setDescription('Choose who you want to learn more about.')
                .setRequired(true)),
    async execute(client, interaction) {
        const member = interaction.options.getMember('member');
        const user = interaction.options.getUser('member');

        try {
            const userEmbed = new EmbedBuilder()
                .setTitle(user.tag)
                .setThumbnail(user.displayAvatarURL())
                .addFields([
                    {
                        name: '_ _',
                        value: `**User ID:** \`${user.id}\`\n**Joined Discord:** <t:${Math.floor(user.createdTimestamp / 1000)}:f>\n**Joined Server:** <t:${Math.floor(member.joinedTimestamp / 1000)}:f>`,
                        inline: false
                    },
                    {
                        name: `Roles [${member.roles.cache.size}]`,
                        value: `${member.roles.cache.map(role => role.toString()).join(' ')}\n`,
                        inline: true
                    },
                ]);
            await interaction.reply({ embeds: [userEmbed] })
        } catch (error) {
            const error_embed = new EmbedBuilder()
                .setTitle('Error')
                .setDescription(`It seems we encountered an error:\n\`${error}\``)
            await interaction.reply({ embeds: [error_embed] });
            console.error(error);
        }
    }
}