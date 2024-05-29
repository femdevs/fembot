const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { Discord: { Initializers: { Command } } } = require('@therealbenpai/djs-client').Utils;
module.exports =
    new Command(
        'announce',
        ['announce'],
        new Command.Info({
            type: 'Management',
            description: 'Make an announcement using the bot.',
            usage: 'announce <channel> <content> [attachment]',
            examples: ['announce #announcements Hello, world! https://example.com/image.png'],
            disabled: false,
        }),
        new Command.Restrictions({ perm: PermissionFlagsBits.ModerateMembers, dms: true }),
        { slash: true, text: true },
        new SlashCommandBuilder()
            .setName('announce')
            .setDescription('Make an announcement using the bot.')
            .addChannelOption(option =>
                option
                    .setName('channel')
                    .setDescription('The channel to send the announcement in.')
                    .setRequired(true)
            )
            .addStringOption(option =>
                option
                    .setName('content')
                    .setDescription('Text that should be in the announcement.')
                    .setRequired(true))
            .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
            .addAttachmentOption(option =>
                option
                    .setName('attachment')
                    .setDescription('Attach media content to go with the announcement.')
                    .setRequired(false)
            ),
    )
        .setCommand(async (client, interaction) => {
            const channel = interaction.options.getChannel('channel');
            const content = interaction.options.getString('content');
            const attachment = interaction.options.getAttachment('attachment');
            const announcementEmbed = client.embed()
                .setTitle('New announcement')
                .setDescription(content)
                .setAuthor({
                    name: `Sent by ${interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL()
                })
                .setColor(0xe31e35);
            const confirmationEmbed = client.embed().setDescription(`**Announcement sent in ${channel}!**`).setColor(0x2ed95b);
            await channel.send({ embeds: [announcementEmbed], files: [attachment || null] });
            await interaction.reply({ embeds: [confirmationEmbed], ephemeral: true });
        })
        .setMessage(async (client, message) => {
            const { channel, attachments: files } = message;
            const content = message.content.slice(message.content.indexOf(' ') + 1);
            const announcementEmbed = client.embed()
                .setTitle('New announcement')
                .setDescription(content)
                .setAuthor({
                    name: `Sent by ${message.author.username}`,
                    iconURL: message.author.displayAvatarURL()
                })
                .setColor(0xe31e35);
            await channel.send({ embeds: [announcementEmbed], files });
        })
        .setAutocomplete(async (_interaction, _client) => { /* Do Stuff Here */ });
