const { SlashCommandBuilder, Collection } = require('discord.js');
const { Discord: { Initializers: { Command } } } = require('@therealbenpai/djs-client').Utils;
const RedditSession = require('snoowrap');
const SQLite = require('better-sqlite3');

const Database = new SQLite('./database.db');

module.exports =
    new Command(
        'astolfo',
        ['astolfo'],
        new Command.Info({
            type: 'Fun',
            description: 'Take a guess',
            usage: 'astolfo',
            examples: ['astolfo'],
            disabled: false,
        }),
        new Command.Restrictions(),
        { slash: true, text: true },
        new SlashCommandBuilder()
            .setName('astolfo')
            .setDescription('Take a guess'),
    )
        .setCommand(async (client, interaction) => {
            await interaction.deferReply();
            const redditCredentials = Database.prepare('SELECT * from reddit ORDER BY RANDOM() LIMIT 1').get();
            delete redditCredentials.id;
            const reddit = new RedditSession(redditCredentials);
            const sub = reddit.getSubreddit("r/Astolfo")
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
            const options = new Collection();
            const redditCredentials = Database.prepare('SELECT * from reddit ORDER BY RANDOM() LIMIT 1').get();
            delete redditCredentials.id;
            const reddit = new RedditSession(redditCredentials);
            const sub = reddit.getSubreddit("r/Astolfo")
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