const { SlashCommandBuilder, ChannelType } = require('discord.js');
const { Discord: { Initializers: { Command } } } = require('@therealbenpai/djs-client').Utils
module.exports =
    new Command(
        'serverinfo',
        ['serverinfo'],
        new Command.Info({
            type: 'Information',
            description: 'Shows information about the server',
            usage: 'serverinfo',
            examples: ['serverinfo'],
            disabled: false,
        }),
        new Command.Restrictions({dms: true}),
        { slash: true, text: true},
        new SlashCommandBuilder()
            .setName('serverinfo')
            .setDescription('Shows information about the server'),
    )
        .setCommand(async (client, interaction) => {
            const server = interaction.guild;
            const data = {
                guildId: server.id,
                guildName: server.name,
                guildOwner: (await server.fetchOwner()),
                guildMembers: {
                    total: server.memberCount,
                    bots: server.members.cache.filter(member => member.user.bot).size,
                    humans: server.members.cache.filter(member => !member.user.bot).size,
                },
                guildChannels: {
                    total: server.channels.cache.size,
                    text: server.channels.cache.filter(channel => channel.type === ChannelType.GuildText).size,
                    voice: server.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice).size,
                    category: server.channels.cache.filter(channel => channel.type === ChannelType.GuildCategory).size,
                    announcements: server.channels.cache.filter(channel => channel.type === ChannelType.GuildAnnouncement).size,
                    stage: server.channels.cache.filter(channel => channel.type === ChannelType.GuildStageVoice).size,
                },
                guildRoles: server.roles.cache.size,
                guildCreatedAt: server.createdTimestamp,
                guildEmojis: {
                    total: server.emojis.cache.size,
                    animated: server.emojis.cache.filter(emoji => emoji.animated).size,
                    static: server.emojis.cache.filter(emoji => !emoji.animated).size,
                },
                guildIcon: server.iconURL({ dynamic: true }),
            }
            const embed = client.embed()
                .setTitle(`Info for ${server.name}`)
                .addFields(
                    {
                        name: 'Owner',
                        value: data.guildOwner.toString(),
                    },
                    {
                        name: 'Members',
                        value: client.Utils.Text.longText(
                            '\n',
                            `Total: ${data.guildMembers.total}`,
                            `Bots: ${data.guildMembers.bots}`,
                            `Humans: ${data.guildMembers.humans}`
                        ),
                    },
                    {
                        name: 'Channels',
                        value: client.Utils.Text.longText(
                            '\n',
                            `Total: ${data.guildChannels.total}`,
                            `Text: ${data.guildChannels.text}`,
                            `Voice: ${data.guildChannels.voice}`,
                            `Category: ${data.guildChannels.category}`,
                            `Announcements: ${data.guildChannels.announcements}`,
                            `Stage: ${data.guildChannels.stage}`
                        )
                    },
                    {
                        name: 'Roles',
                        value: data.guildRoles.toString(),
                    },
                    {
                        name: 'Emojis',
                        value: client.Utils.Text.longText(
                            '\n',
                            `Total: ${data.guildEmojis.total}`,
                            `Animated: ${data.guildEmojis.animated}`,
                            `Static: ${data.guildEmojis.static}`
                        ),
                    },
                    {
                        name: 'Created At',
                        value: `<t:${client.Utils.Time.unixTime(new Date(data.guildCreatedAt))}:F>`,
                    },
                )
                .setColor(0xa331d4)
                .setThumbnail(data.guildIcon);
            await interaction.reply({ embeds: [embed] })
        })
        .setMessage(async (client, message) => {
            const server = message.guild;
            const data = {
                guildId: server.id,
                guildName: server.name,
                guildOwner: (await server.fetchOwner()),
                guildMembers: {
                    total: server.memberCount,
                    bots: server.members.cache.filter(member => member.user.bot).size,
                    humans: server.members.cache.filter(member => !member.user.bot).size,
                },
                guildChannels: {
                    total: server.channels.cache.size,
                    text: server.channels.cache.filter(channel => channel.type === ChannelType.GuildText).size,
                    voice: server.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice).size,
                    category: server.channels.cache.filter(channel => channel.type === ChannelType.GuildCategory).size,
                    announcements: server.channels.cache.filter(channel => channel.type === ChannelType.GuildAnnouncement).size,
                    stage: server.channels.cache.filter(channel => channel.type === ChannelType.GuildStageVoice).size,
                },
                guildRoles: server.roles.cache.size,
                guildCreatedAt: server.createdTimestamp,
                guildEmojis: {
                    total: server.emojis.cache.size,
                    animated: server.emojis.cache.filter(emoji => emoji.animated).size,
                    static: server.emojis.cache.filter(emoji => !emoji.animated).size,
                },
                guildIcon: server.iconURL({ dynamic: true }),
            }
            const embed = client.embed()
                .setTitle(`Info for ${server.name}`)
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
                        value: `Total: ${data.guildEmojis.total}\nAnimated: ${data.guildEmojis.filter(emoji => emoji.animated).size}\nStatic: ${data.guildEmojis.filter(emoji => !emoji.animated).size}`,
                    },
                    {
                        name: 'Created At',
                        value: `<t:${client.Utils.Time.unixTime(new Date(data.guildCreatedAt))}:F>`,
                    },
                )
                .setColor(0xa331d4)
                .setThumbnail(data.guildIcon);
            await message.reply({ embeds: [embed] });
        })
        .setAutocomplete(async (client, interaction) => { /* Do Stuff Here */ });
