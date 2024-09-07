const { SlashCommandBuilder, Collection } = require('discord.js');
const { Discord: { Initializers: { Command } } } = require('@therealbenpai/djs-client').Utils;
const axios = require('axios');
module.exports =
    new Command(
        'astolfo',
        ['astolfo'],
        new Command.Info({
            type: 'Fun',
            description: 'Take a guess',
            usage: 'astolfo',
            examples: ['astolfo'],
            disabled: true,
        }),
        new Command.Restrictions(),
        { slash: true, text: false },
        new SlashCommandBuilder()
            .setName('astolfo')
            .setDescription('Take a guess'),
    )
        .setCommand(async (client, interaction) => {
            await interaction.deferReply();
            const options = new Collection();
            const res = await axios.get(`http://www.reddit.com/r/Astolfo/new/.json?limit=100`, {
                headers: { 'User-Agent': 'Discord Bot (node-20)' },
                responseType: 'json',
            });
            (await res.data).data.children.filter(post => post.data.post_hint == 'image').map(p => options.set(options.size, p))
            const randomLink = options.random();
            const embed = client.embed()
                .setTitle(randomLink.data.title)
                .setURL(randomLink.data.url)
                .setImage(randomLink.data.url)
                .setTimestamp()
            interaction.editReply({ embeds: [embed] });
        })
        .setMessage(async (client, message) => {
            const options = new Collection();
            const res = await axios.get(`https://www.reddit.com/r/Astolfo/new/.json?limit=100`, {
                headers: { 'User-Agent': 'Discord Bot (node-20)' },
                responseType: 'json'
            });
            (await res.data).data.children.filter(post => post.data.post_hint == 'image').map(p => options.set(options.size, p))
            const randomLink = options.random();
            const embed = client.embed()
                .setTitle(randomLink.data.title)
                .setURL(randomLink.data.url)
                .setImage(randomLink.data.url)
                .setTimestamp()

            message.reply({ embeds: [embed] });
        })
        .setAutocomplete(async (_interaction, _client) => { /* Do Stuff Here */ });