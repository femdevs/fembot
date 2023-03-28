const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'serverinfo',
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Shows information about the server'),
    async execute(client, interaction) {
        const embed = new EmbedBuilder()
            .setTitle(`Info for ${interaction.guild.name}`)
            .addFields(
                {name: 'Owner', value: `<@${interaction.guild.ownerId}>`, inline: true},
                {name: 'Members', value: `${interaction.guild.memberCount}`, inline: true},
                {name: 'Channels', value: `${interaction.guild.channels.cache.size}`, inline: true},
                {name: 'Roles', value: `${interaction.guild.roles.cache.size}`, inline: true},
                {name: 'Created At', value: `${interaction.guild.createdAt}`, inline: true},
                {name: 'Emojis', value: `${interaction.guild.emojis.cache.size}`, inline: true},
            )
            .setColor(0xa331d4)
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }));
        await interaction.reply({ embeds: [embed] });
    }
}