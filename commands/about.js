const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'about',
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Get info about the bot'),
    async execute(client, interaction) {
        const imageURL = "https://cdn.discordapp.com/attachments/1078326760539684864/1089361508196159609/IMG_2351.png" // Developer Note: I typed this out by hand. Stupid school blocks Discord.
        const embed = new EmbedBuilder()
            .setAuthor(
                {
                    name: 'FemDevs',
                    iconURL: imageURL,
                    url: 'https://github.com/FemDevs'
                }
            )
            .setTitle('About the bot')
            .setDescription('This is a private bot originally created by Alex. We then moved it over to FemDevs, which includes Benpai and Oblong too.')
            .addFields(
                {
                    name: 'Developers',
                    value: [
                        '<@505458216474378271> - Oblong',
                        '<@530748350119673896> - Alex',
                        '<@957352586086875216> - Benpai'
                    ].join('\n')
                }
            )
            .setFooter(
                {
                    text: 'Made with humor by FemDevs',
                    iconURL: imageURL
                }
            )
            .setTimestamp()
            .setColor(Math.floor(Math.random() * Math.pow(16, 6)))
        interaction.reply({ embeds: [embed] });
    }
}