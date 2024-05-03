const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { Discord: { Initializers: { Command } } } = require('../modules/util.js');
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
            disabled: false,
        }),
        new Command.Restrictions(),
        { slash: true, text: true },
        new SlashCommandBuilder()
            .setName('astolfo')
            .setDescription('Take a guess'),
    )
        .setCommand(async (interaction, client) => {
            await interaction.deferReply();
            const res = await axios.get(`https://www.reddit.com/r/Astolfo/hot/.json?limit=100`, {
                headers: { 'User-Agent': 'Discord Bot (node-20)' },
                responseType: 'json'
            });
            const { data } = await res.data;
            const validLinks = data.children.filter(post => post.data.post_hint == 'image');
            const randomLink = validLinks[Math.floor(Math.random() * validLinks.length)];
            const embed = client.embed()
                .setTitle(randomLink.data.title)
                .setURL(randomLink.data.url)
                .setImage(randomLink.data.url)
                .setTimestamp()
            interaction.editReply({ embeds: [embed] });
        })
        .setMessage(async (message, client) => {
            const res = await axios.get(`https://www.reddit.com/r/Astolfo/hot/.json?limit=100`, {
                headers: { 'User-Agent': 'Discord Bot (node-20)' },
                responseType: 'json'
            });
            const { data } = await res.data;
            const validLinks = data.children.filter(post => post.data.post_hint == 'image');
            const randomLink = validLinks[Math.floor(Math.random() * validLinks.length)];
            const embed = client.embed()
                .setTitle(randomLink.data.title)
                .setURL(randomLink.data.url)
                .setImage(randomLink.data.url)
                .setTimestamp()

            message.reply({ embeds: [embed] });
        })
        .setAutocomplete(async (_interaction, _client) => { /* Do Stuff Here */ });