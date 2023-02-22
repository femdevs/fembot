const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'astolfo',
    data: new SlashCommandBuilder()
        .setName('astolfo')
        .setDescription('Take a guess'),
    async execute(client, interaction) {
        // get a random pic from r/astolfo using the fetch API
        // make sure that it is actually an image
        const subreddit = (Math.ceil(Math.random() * 8) == 5) ? 'astolfor34' : 'astolfo';
        await fetch(`https://www.reddit.com/r/${subreddit}/random/.json`)
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