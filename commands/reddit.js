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
        .setCommand(async (interaction, client) => {
            const subreddit = interaction.options.getString('subreddit');
            await interaction.deferReply();
            const options = new Collection();
            const res = await axios.get(`https://www.reddit.com/r/${subreddit}/new/.json?limit=100`, {
                headers: { 'User-Agent': 'Discord Bot (node-20)' },
                responseType: 'json'
            });
            (await res.data).data.children.filter(post => post.data.post_hint == 'image').map(p => options.set(options.size, p))
            const randomLink = options.random();
            const embed = client.embed()
                .setTitle(randomLink.data.title)
                .setURL(randomLink.data.url)
                .setImage(randomLink.data.url)
                .setFooter({
                    text: `Requested by ${interaction.user.tag} | Subreddit: ${subreddit}`,
                    iconURL: interaction.user.displayAvatarURL()
                })
                .setTimestamp()
            interaction.editReply({ embeds: [embed] });
        })
        .setMessage(async (message, client) => {
            const subreddit = message.content.split(' ')[1];
            const options = new Collection();
            const res = await axios.get(`https://www.reddit.com/r/${subreddit}/new/.json?limit=100`, {
                headers: { 'User-Agent': 'Discord Bot (node-20)' },
                responseType: 'json'
            });
            (await res.data).data.children.filter(post => post.data.post_hint == 'image').map(p => options.set(options.size, p))
            const randomLink = options.random();
            const embed = client.embed()
                .setTitle(randomLink.data.title)
                .setURL(randomLink.data.url)
                .setImage(randomLink.data.url)
                .setFooter({
                    text: `Requested by ${message.author.tag} | Subreddit: ${subreddit}`,
                    iconURL: message.author.displayAvatarURL()
                })
                .setTimestamp()
            message.reply({ embeds: [embed] });
        })
        .setAutocomplete(async (_interaction, _client) => { /* Do Stuff Here */ });