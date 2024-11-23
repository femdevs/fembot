const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');
const {
    Text,
    Discord: { Utils: { Markdown, Embed, Mentions }, Initializers: { Command } },
    List,
} = require('@therealbenpai/djs-client').Utils;

const find = (check) => (expected) => Object.entries(check).find(([_, v]) => v === expected)[0]

/**
 * @param {import('@therealbenpai/djs-client').Client} client
 * @param {import('@therealbenpai/djs-client').Classes.Command?} command
 * @param {0|1} type
 */
const handle = (client, command, type) => {
    const embed = client.embed()
        .setTitle(`Help${command ? ` for ${command.name}` : ''}`)
        .setDescription(command ? command.info.description : `Use \`${type ? client.configs.prefix : '/'}help [command]\` to get help with a specific command.`)
        .addFields(command
            ? [
                Embed.Field('Type', command.info.type),
                Embed.Field('Aliases', List.and(command.triggers.filter(string => string !== command.name).map(Markdown.inlineCode)) || 'None'),
                Embed.Field('Usage', Markdown.inlineCode((type ? client.configs.prefix : '/') + command.info.usage)),
                Embed.Field('Examples', command.info.examples
                    .map(exm => Markdown.inlineCode((type ? client.configs.prefix : '/') + exm))
                    .join('\n')
                ),
                Embed.Field('Status', Text.enabledDisabled(!command.disabled)),
                Embed.Field('DMs', Text.enabledDisabled(!command.blockDM)),
                Embed.Field(
                    'Required Permissions',
                    command.requiredPerm ? find(PermissionFlagsBits)(command.requiredPerm) : 'None',
                ),
                Embed.Field(
                    'Channel Types',
                    List.and(command.channelLimits.map(find(ChannelType))) || 'None',
                ),
                Embed.Field('Allowed Roles', List.and(command.allowedRoles.map(Mentions.role)) || 'None'),
                Embed.Field('Allowed Users', List.and(command.allowedUsers.map(Mentions.user)) || 'None'),
            ]
            : Array.from(client.Commands.values())
                .reduce((d, v) => {
                    if (!d.find(([k, _]) => k === v.info.type)) {
                        d.push([v.info.type, []]);
                    }
                    d[d.findIndex(([k, _]) => k === v.info.type)][1].push(`${type ? client.configs.prefix : '/'}${v.info.name}`);
                    return d;
                }, [])
                .map(([k, v]) => Embed.Field(k, List.and(v.map(Markdown.inlineCode)))));
    return embed;
};

const checkCommand = (cmd, command) => cmd && !command
    ? 'That command does not exist.'
    : command && command.disabled
        ? 'That command is disabled.'
        : null;

module.exports =
    new Command(
        'help',
        ['help', 'h'],
        new Command.Info({
            type: 'Information',
            description: 'Get help with the bot.',
            usage: 'help [command]',
            examples: ['help', 'help emit'],
            disabled: false,
        }),
        new Command.Restrictions({ dms: true }),
        { slash: true, text: true },
        new SlashCommandBuilder()
            .setName('help')
            .setDescription('Get help with the bot.')
            .addStringOption((option) => option
                .setName('command')
                .setDescription('The command to get help with')
                .setAutocomplete(true)),
    )
        .setCommand(async (client, interaction) => {
            const cmd = interaction.options.getString('command');
            const command = client.Commands.get(cmd);
            const check = checkCommand(cmd, command);
            if (check) return interaction.reply(check);
            interaction.reply({ embeds: [handle(client, command || null, 0)] });
        })
        .setMessage(async (client, message) => {
            const cmd = message.content.split(' ').at(1)
            const command = client.Commands.get(cmd);
            const check = checkCommand(cmd, command);
            if (check) return message.reply(check);
            message.reply({ embeds: [handle(client, command || null, 1)] });
        })
        .setAutocomplete(async (client, interaction) => {
            const choices = Array.from(client.Commands.values())
                .filter((cmd) => Array.of(
                    !cmd.disabled,
                    cmd.type.slash,
                    cmd.info.name.toLowerCase().includes(interaction.options.getFocused()),
                ).every(Boolean))
                .map((cmd) => ({ name: cmd.info.name, value: cmd.info.name }));
            interaction.respond(choices);
        });