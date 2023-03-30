const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'announce',
    data: new SlashCommandBuilder()
        .setName('announce')
        .setDescription('Make an announcement using the bot.')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to send the announcement in.')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('content')
                .setDescription('Text that should be in the announcement.')
                .setRequired(true))
        .addBooleanOption(option => 
            option.setName('mention')
                .setDescription('Choose whether to mention everyone in the guild (yes/no).'))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers | PermissionFlagsBits.SendMessages),

    async execute(client, interaction) {
        const channel = interaction.options.getChannel('channel');
        const content = interaction.options.getString('content');
        const mention = interaction.options.getBoolean('mention');

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

        if (mention === true) {
            const ping = '@everyone';
            await channel.send({embeds: [announcementEmbed], content: ping});
        } else {
            await channel.send({embeds: [announcementEmbed]});
        }
        await interaction.reply({embeds: [confirmationEmbed], ephemeral: true});
    }
}