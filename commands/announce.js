const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'announce',
    type: {
        command: true,
        text: true
    },
    triggers: ['announce'],
    data: new SlashCommandBuilder()
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
                .setDescription('Attach media content to go with the annoncement.')
                .setRequired(false)
        ),
    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').ChatInputCommandInteraction} interaction
     */

    async execute(client, interaction) {
        const channel = interaction.options.getChannel('channel');
        const content = interaction.options.getString('content');
        const attachment = interaction.options.getAttachment('attachment');

        const announcementEmbed = new EmbedBuilder()
            .setTitle('New announcement')
            .setDescription(content)
            .setAuthor({
                name: `Sent by ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL()
            })
            .setColor(0xe31e35);

        const confirmationEmbed = new EmbedBuilder()
            .setDescription(`**Announcement sent in ${channel}!**`)
            .setColor(0x2ed95b);

        if (attachment !== null) {
            await channel.send({ embeds: [announcementEmbed], files: [attachment] });
        }
        else {
            await channel.send({ embeds: [announcementEmbed] });
        }
        await interaction.reply({ embeds: [confirmationEmbed], ephemeral: true });
    },
    async messageExecute(client, message) {
        const { channel, attachments: files } = message;
        const content = message.content.slice(message.content.indexOf(' ') + 1);

        const announcementEmbed = new EmbedBuilder()
            .setTitle('New announcement')
            .setDescription(content)
            .setAuthor({
                name: `Sent by ${message.author.username}`,
                iconURL: message.author.displayAvatarURL()
            })
            .setColor(0xe31e35);

        await channel.send({ embeds: [announcementEmbed], files });
    }
}