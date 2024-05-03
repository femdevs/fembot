const { SlashCommandBuilder } = require('discord.js');
const { Discord: { Initializers: { Command } } } = require('../modules/util.js');
module.exports =
    new Command(
        'about',
        ['about'],
        new Command.Info({
            type: 'Information',
            description: 'Get info about the bot',
            usage: 'about',
            examples: ['about'],
            disabled: false,
        }),
        new Command.Restrictions({}),
        { slash: true, text: true },
        new SlashCommandBuilder()
            .setName('about')
            .setDescription('Get info about the bot'),
    )
        .setCommand(async (interaction, client) => {
            interaction.reply({ embeds: [client.embed()
                .setAuthor(
                    {
                        name: 'FemDevs',
                        iconURL: "https://cdn.discordapp.com/attachments/1078326760539684864/1089361508196159609/IMG_2351.png",
                        url: 'https://github.com/FemDevs'
                    }
                )
                .setTitle('About the bot')
                .setDescription('This is a private bot originally created by Alex. We then moved it over to FemDevs, which includes Benpai and Oblong too.')
                .addFields(
                    {
                        name: 'Developers',
                        value: [
                            '<@505458216474378271> - Oblong',
                            '<@530748350119673896> - Alex',
                            '<@957352586086875216> - Benpai'
                        ].join('\n')
                    },
                )] });
        })
        .setMessage(async (message, client) => {
            message.reply({ embeds: [client.embed()
                .setAuthor(
                    {
                        name: 'FemDevs',
                        iconURL: "https://cdn.discordapp.com/attachments/1078326760539684864/1089361508196159609/IMG_2351.png",
                        url: 'https://github.com/FemDevs'
                    }
                )
                .setTitle('About the bot')
                .setDescription('This is a private bot originally created by Alex. We then moved it over to FemDevs, which includes Benpai and Oblong too.')
                .addFields(
                    {
                        name: 'Developers',
                        value: [
                            '<@505458216474378271> - Oblong',
                            '<@530748350119673896> - Alex',
                            '<@957352586086875216> - Benpai'
                        ].join('\n')
                    },
                )] });
        })
        .setAutocomplete(async (_interaction, _client) => { /* Do Stuff Here */ });
