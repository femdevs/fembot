const { Events } = require('discord.js');
const { Discord: { Initializers: { Event }, Utils: { Embed } } } = require('@therealbenpai/djs-client').Utils

module.exports = new Event(Events.MessageUpdate)
    .setExecute(async (client, oldMsg, newMsg) => {
        if (Array.of(
            newMsg.content === oldMsg.content,
            newMsg.author.bot,
            newMsg.channel.type === 'DM',
            newMsg.partial,
        ).some((value) => value)) return;

        const embed = client.embed()
            .setAuthor(Embed.Author(
                newMsg.author.tag,
                null,
                newMsg.author.displayAvatarURL({ dynamic: true }),
            ))
            .setDescription("Message edited")
            .setFields(
                Embed.Field(
                    "Old Message",
                    "```" + oldMsg.content + "```",
                ),
                Embed.Field(
                    "New Message",
                    "```" + newMsg.content + "```",
                ),
            )
            .setFooter(Embed.Footer(
                `Message ID: ${newMsg.id}`,
                newMsg.guild.iconURL({ dynamic: true }),
            ))
            .setTimestamp();

        client.channels.cache.get("1125149278915014666").send({ embeds: [embed] });

        if (newMsg.content.startsWith(client.prefix)) {
            const cmd = Array.from(client.Commands.values())
                .find(
                    (command) => command.triggers
                        .includes(newMsg.content.split(' ')[0].slice(client.prefix.length).toLowerCase()),
                );
            if (!cmd || !cmd.type.text) return;
            client.bumpRTS('commands.text');
            const failureReason = Array.of(
                cmd.blockDM && newMsg.channel.isDMBased(),
                cmd.channelLimits && !cmd.channelLimits.includes(newMsg.channel.type),
                Array.of(
                    cmd.requiredPerm && newMsg.guild && !newMsg.member.permissions.has(cmd.requiredPerm),
                    cmd.allowedRoles && !newMsg.member.roles.cache.some((role) => cmd.allowedRoles.includes(role.id)),
                    cmd.allowedUsers && !cmd.allowedUsers.includes(newMsg.author.id),
                ).some(Boolean),
                cmd.disabled,
            ).findIndex(Boolean);
            return failureReason
                ? newMsg.reply(
                    ['dmDisabled', 'invalidChannelType', 'noPerms', 'disabled']
                        .map((e) => client.configs.defaults[e])[failureReason - 1],
                )
                : cmd.messageExecute(newMsg, client);
        }
    });
