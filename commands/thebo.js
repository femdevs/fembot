const { SlashCommandBuilder } = require('discord.js');
const { Discord: { Initializers: { Command } } } = require('@therealbenpai/djs-client').Utils
const { thebo } = require('../online_assets.json');
module.exports =
    new Command(
        'thebo',
        ['thebo'],
        new Command.Info({
            type: 'Fun',
            description: 'THE BO',
            usage: 'thebo',
            examples: ['thebo'],
            disabled: false,
        }),
        new Command.Restrictions(),
        { slash: true, text: true },
        new SlashCommandBuilder()
            .setName('thebo')
            .setDescription('THE BO'),
    )
        .setCommand(async (client, interaction) => {
            await interaction.reply(thebo[Math.floor(Math.random() * thebo.length)]);
        })
        .setMessage(async (client, message) => {
            await message.reply(thebo[Math.floor(Math.random() * thebo.length)]);
        })
        .setAutocomplete(async (_interaction, _client) => { /* Do Stuff Here */ });
