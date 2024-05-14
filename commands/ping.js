const { SlashCommandBuilder } = require('discord.js');
const { Discord: { Initializers: { Command } } } = require('@therealbenpai/djs-client').Utils;
module.exports =
    new Command(
        'ping',
        ['ping'],
        new Command.Info({
            type: 'Information',
            description: 'Replies with Pong!',
            usage: 'ping',
            examples: ['ping'],
            disabled: false,
        }),
        new Command.Restrictions(),
        { slash: true, text: true },
        new SlashCommandBuilder()
            .setName('ping')
            .setDescription('Replies with Pong!'),
    )
        .setCommand(async (interaction, client) => {
            await interaction.reply('Pong!');
        })
        .setMessage(async (message, client) => {
            await message.reply('Pong!');
        })
        .setAutocomplete(async (_interaction, _client) => { /* Do Stuff Here */ });
