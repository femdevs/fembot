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
        { slash: true, text: true},
        new SlashCommandBuilder()
            .setName('ping')
            .setDescription('Replies with Pong!'),
    )
        .setCommand(async (client, interaction) => {
            if (client.developers.get())
            await interaction.reply('Pong!');
        })
        .setMessage(async (client, message) => {
            await message.reply('Pong!');
        })
        .setAutocomplete(async (client, interaction) => { /* Do Stuff Here */ });
