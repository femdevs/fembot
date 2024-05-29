const { SlashCommandBuilder } = require('discord.js');
const { Discord: { Initializers: { Command } } } = require('@therealbenpai/djs-client').Utils;
module.exports =
    new Command(
        'botstatus',
        ['botstatus'],
        new Command.Info({
            type: 'Development',
            description: 'Bot Status',
            usage: 'botstatus',
            examples: ['botstatus'],
            disabled: false,
        }),
        new Command.Restrictions(),
        { slash: true, text: true },
        new SlashCommandBuilder()
            .setName('botstatus')
            .setDescription('Bot Status')
    )
        .setCommand(async (client, interaction) => {
            const data = client.stats()
            const embed = client.embed()
                .setTitle('Bot Status')
                .setDescription('Bot Status')
                .setTimestamp()
                .addFields(
                    {
                        name: 'Uptime',
                        value: data.uptime
                    },
                    {
                        name: 'Ping',
                        value: data.ping + 'ms'
                    },
                    {
                        name: 'Ram',
                        value: `${data.ram.botOnly.rawValue}${data.ram.botOnly.unit}`
                    }
                )
            interaction.reply({ embeds: [embed] })
        })
        .setMessage(async (client, message) => {
            const data = client.stats()
            const embed = client.embed()
                .setTitle('Bot Status')
                .setDescription('Bot Status')
                .setTimestamp()
                .addFields(
                    {
                        name: 'Uptime',
                        value: data.uptime
                    },
                    {
                        name: 'Ping',
                        value: data.ping + 'ms'
                    },
                    {
                        name: 'Ram',
                        value: `${data.ram.botOnly.rawValue}${data.ram.botOnly.unit}`
                    }
                )
            message.reply({ embeds: [embed] })
        })
        .setAutocomplete(async (_interaction, _client) => { /* Do Stuff Here */ });
