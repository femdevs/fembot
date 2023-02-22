const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'alstolfo',
    data: new SlashCommandBuilder()
        .setName('alstolfo')
        .setDescription('Take a guess'),
    async execute(client, interaction) {
        // get a random pic from r/astolfo using the fetch API
        // make sure that it is actually an image
        await fetch('https://www.reddit.com/r/astolfo/random/.json')
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