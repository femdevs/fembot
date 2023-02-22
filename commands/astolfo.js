const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'astolfo',
    data: new SlashCommandBuilder()
        .setName('astolfo')
        .setDescription('Take a guess'),
    async execute(client, interaction) {
        await fetch(`https://www.reddit.com/r/$astolfo/random/.json`)
            .then(response => response.json())
            .then(data => {
                const validLinks = data.data.children.filter(post => post.data.post_hint == 'image');
                const randomLink = validLinks[Math.floor(Math.random() * validLinks.length)];
                const embed = new EmbedBuilder()
                    .setTitle(randomLink.data.title)
                    .setURL(randomLink.data.url)
                    .setImage(randomLink.data.url)
                    .setTimestamp()

                interaction.reply({ embeds: [embed] });
            })
    }
}