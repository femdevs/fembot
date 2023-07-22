const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'astolfo',
    type: {
        command: true,
        text: true
    },
    triggers: ['astolfo'],
    data: new SlashCommandBuilder()
        .setName('astolfo')
        .setDescription('Take a guess'),
    async execute(client, interaction) {
        await interaction.deferReply();
        await fetch(`https://www.reddit.com/r/astolfo/random/.json`)
            .then(response => response.json())
            .then(data => {
                const validLinks = data.data.children.filter(post => post.data.post_hint == 'image');
                const randomLink = validLinks[Math.floor(Math.random() * validLinks.length)];
                const embed = new EmbedBuilder()
                    .setTitle(randomLink.data.title)
                    .setURL(randomLink.data.url)
                    .setImage(randomLink.data.url)
                    .setTimestamp()

                interaction.editReply({ embeds: [embed] });
            })
    },
    async messageExecute(client, message) {
        const {data} = (await fetch(`https://www.reddit.com/r/astolfo/random/.json`).then(response => response.json()))
        const validLinks = data.children.filter(post => post.data.post_hint == 'image');
        const randomLink = validLinks[Math.floor(Math.random() * validLinks.length)];
        const embed = new EmbedBuilder()
            .setTitle(randomLink.data.title)
            .setURL(randomLink.data.url)
            .setImage(randomLink.data.url)
            .setTimestamp()

        message.reply({ embeds: [embed] });
    }
}