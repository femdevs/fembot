const { SlashCommandBuilder, Collection } = require('discord.js');
const { Discord: { Initializers: { Command } } } = require('@therealbenpai/djs-client').Utils
const axios = require('axios');
module.exports =
    new Command(
        'reddit',
        ['reddit'],
        new Command.Info({
            type: 'Fun',
            description: 'Grabs a random image off of a subreddit',
            usage: 'reddit <subreddit>',
            examples: ['reddit astolfo', 'reddit memes'],
            disabled: false,
        }),
        new Command.Restrictions(),
        { slash: true, text: true },
        new SlashCommandBuilder()
            .setName('reddit')
            .setDescription('Grabs a random image off of a subreddit')
            .addStringOption(option =>
                option
                    .setName('subreddit')
                    .setDescription('The subreddit to grab the image from')
                    .setRequired(true)
            ),
    )
        .setCommand(async (client, interaction) => {
            await interaction.deferReply();
            const subreddit = interaction.options.getString('subreddit');
            const redditCredentials = Database.prepare('SELECT * from reddit ORDER BY RANDOM() LIMIT 1').get();
            delete redditCredentials.id;
            const reddit = new RedditSession(redditCredentials);
            const sub = reddit.getSubreddit("r/" + subreddit)
            let post = await sub.getRandomSubmission();
            const validExtensions = ['jpg', 'png', 'jpeg', 'gif'];
            while (!validExtensions.includes(post.url.split('.').pop())) {
                post = await sub.getRandomSubmission()
            }
            /** @type {RedditSession.Submission} */
            const randomLink = post;
            const embed = client.embed()
                .setTitle(randomLink.title)
                .setURL(randomLink.url)
                .setImage(randomLink.url)
                .setTimestamp()
            interaction.editReply({ embeds: [embed] });
        })
        .setMessage(async (client, message) => {
            const args = message.content.split(' ').slice(1);
            const subreddit = args.join(' ');
            const redditCredentials = Database.prepare('SELECT * from reddit ORDER BY RANDOM() LIMIT 1').get();
            delete redditCredentials.id;
            const reddit = new RedditSession(redditCredentials);
            const sub = reddit.getSubreddit("r/" + subreddit)
            let post = await sub.getRandomSubmission();
            const validExtensions = ['jpg', 'png', 'jpeg', 'gif'];
            while (!validExtensions.includes(post.url.split('.').pop())) {
                post = await sub.getRandomSubmission()
            }
            /** @type {RedditSession.Submission} */
            const randomLink = post;
            const embed = client.embed()
                .setTitle(randomLink.title)
                .setURL(randomLink.url)
                .setImage(randomLink.url)
                .setTimestamp()
            message.reply({ embeds: [embed] });
        })
        .setAutocomplete(async (client, interaction) => { /* Do Stuff Here */ });