const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
    name: 'serverinfo',
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Shows information about the server'),
    async execute(client, interaction) {
        const data = {
            guildId: interaction.guild.id,
            guildName: interaction.guild.name,
            guildOwner: (await interaction.guild.fetchOwner()),
            guildMembers: {
                total: interaction.guild.memberCount,
                bots: interaction.guild.members.cache.filter(member => member.user.bot).size,
                humans: interaction.guild.members.cache.filter(member => !member.user.bot).size,
            },
            guildChannels: {
                total: interaction.guild.channels.cache.size,
                text: interaction.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildText).size,
                voice: interaction.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice).size,
                category: interaction.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildCategory).size,
                announcements: interaction.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildAnnouncement).size,
                stage: interaction.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildStageVoice).size,
            },
            guildRoles: interaction.guild.roles.cache.size,
            guildCreatedAt: interaction.guild.createdAt,
            guildEmojis: {
                total: interaction.guild.emojis.cache.size,
                animated: interaction.guild.emojis.cache.filter(emoji => emoji.animated).size,
                static: interaction.guild.emojis.cache.filter(emoji => !emoji.animated).size,
            },
            guildIcon: interaction.guild.iconURL({ dynamic: true }),
        }
        const embed = new EmbedBuilder()
            .setTitle(`Info for ${interaction.guild.name}`)
            .addFields(
                {
                    name: 'Owner',
                    value: data.guildOwner.toString(),
                },
                {
                    name: 'Members',
                    value: `Total: ${data.guildMembers.total}\nBots: ${data.guildMembers.bots}\nHumans: ${data.guildMembers.humans}`,
                },
                {
                    name: 'Channels',
                    value: `Total: ${data.guildChannels.total}\nText: ${data.guildChannels.text}\nVoice: ${data.guildChannels.voice}\nCategory: ${data.guildChannels.category}\nAnnouncements: ${data.guildChannels.announcements}\nStage: ${data.guildChannels.stage}`,
                },
                {
                    name: 'Roles',
                    value: data.guildRoles.toString(),
                },
                {
                    name: 'Emojis',
                    value: `Total: ${data.guildEmojis.total}\nAnimated: ${data.guildEmojis.animated}\nStatic: ${data.guildEmojis.static}`,
                },
                {
                    name: 'Created At',
                    value: data.guildCreatedAt.toString(),
                },
            )
            .setColor(0xa331d4)
            .setThumbnail(data.guildIcon);
        await interaction.reply({ embeds: [embed] });
    }
}