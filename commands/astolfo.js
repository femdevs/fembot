const { SlashCommandBuilder, Collection } = require('discord.js');
const { Discord: { Initializers: { Command } } } = require('@therealbenpai/djs-client').Utils;

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
            const imageID = await fetch(
                'https://astolfo.rocks/api/images/random?rating=questionable',
                {
                    headers: {
                        'accept': 'application/json',
                    }
                }
            ).then((res) => res.json());
            const embed = client.embed()
                .setTitle(`Astolfo Image #${imageID.id}`)
                .setURL(`https://astolfo.rocks/astolfo/${imageID.id}.${imageID.file_extension}`)
                .setImage(`https://astolfo.rocks/astolfo/${imageID.id}.${imageID.file_extension}`)
                .setTimestamp()
            interaction.editReply({ embeds: [embed] });
        })
        .setMessage(async (client, message) => {
            const imageID = await fetch(
                'https://astolfo.rocks/api/images/random?rating=questionable',
                {
                    headers: {
                        'accept': 'application/json',
                    }
                }
            ).then((res) => res.json());
            const embed = client.embed()
                .setTitle(`Astolfo Image #${imageID.id}`)
                .setURL(`https://astolfo.rocks/astolfo/${imageID.id}.${imageID.file_extension}`)
                .setImage(`https://astolfo.rocks/astolfo/${imageID.id}.${imageID.file_extension}`)
                .setTimestamp()
            message.reply({ embeds: [embed] });
        })
        .setAutocomplete(async (client, interaction) => { /* Do Stuff Here */ });