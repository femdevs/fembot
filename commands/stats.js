const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { Discord: { Initializers: { Command } } } = require('@therealbenpai/djs-client').Utils
module.exports =
    new Command(
        'stats',
        ['stats'],
        new Command.Info({
            type: 'Development',
            description: 'Check how many times you have ran a command!',
            usage: 'stats',
            examples: ['stats'],
            disabled: true,
        }),
        new Command.Restrictions(),
        { slash: false, text: false },
        new SlashCommandBuilder()
            .setName('stats')
            .setDescription('Check how many times you have ran a command!'),
    )
        .setCommand(async (_interaction, _client) => { /* Do Stuff Here */ })
        .setMessage(async (_message, _client) => { /* Do Stuff Here */ })
        .setAutocomplete(async (_interaction, _client) => { /* Do Stuff Here */ });
