const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { Discord: { Initializers: { Command } } } = require('@therealbenpai/djs-client').Utils

const fs = require('fs');

module.exports =
    new Command(
        'thegoods',
        ['thegoods'],
        new Command.Info({
            type: 'Fun',
            description: 'Take a guess',
            usage: 'thegoods',
            examples: ['thegoods'],
            disabled: false,
        }),
        new Command.Restrictions(),
        { slash: true, text: false },
        new SlashCommandBuilder()
            .setName('thegoods')
            .setDescription('Take a guess'),
    )
        .setCommand(async (client, interaction) => {
            await interaction.reply({
                files: [
                    new AttachmentBuilder(
                        fs.readFileSync(`${process.cwd()}/the_goods.mp3`),
                        { name: 'theGoods.mp3' }
                    ),
                ]
            });
        })
        .setMessage(async (client, message) => {
            await message.reply({
                files: [
                    new AttachmentBuilder(
                        fs.readFileSync(`${process.cwd()}/the_goods.mp3`),
                        { name: 'theGoods.mp3' }
                    )
                ]
            });
        })
        .setAutocomplete(async (_interaction, _client) => { /* Do Stuff Here */ });
