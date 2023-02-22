const { SlashCommandBuilder } = require('@discordjs/builders');
const RedditSession = require('snoowrap')

const data = new SlashCommandBuilder()
    .setName('nsfw')
    .setDescription('NSFW commands')
    .addSubcommand(subcommand =>
        subcommand
            .setName('femboy')
            .setDescription('Take a guess'))
data.nsfw = true;
module.exports = {
    name: 'nsfw',
    data,
    async execute(client, interaction) {
        const reddit = new RedditSession({
            userAgent: 'discord:com.fembot.fembot:1.0.0 (by /u/sparty182020)',
            clientId: "wYDGYVhxPTDtUw1-moepew",
            clientSecret: "Ff1KM1Y4lithvOT3U1kwKWt76hTFkg",
            username: "spartymod",
            password: "Bm156226"
        });
        switch (interaction.options.getSubcommand()) {
            case 'femboy':
                await reddit.getSubreddit("r/femboyhentai").getRandomSubmission().then(post => {
                    interaction.reply(post.url);
                })
                break;
            }
    }
}

