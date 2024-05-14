const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { Discord: { Initializers: { Command } } } = require('@therealbenpai/djs-client').Utils
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
        { slash: true, text: true },
        new SlashCommandBuilder()
            .setName('thegoods')
            .setDescription('Take a guess'),
    )
        .setCommand(async (interaction, client) => {
            const file = new AttachmentBuilder(client.sfiles.theGoods, { name: 'theGoods.mp3' });
            await interaction.reply({ content: 'Credit: Benpai', files: [file] });
        })
        .setMessage(async (message, client) => {
            const file = new AttachmentBuilder(client.sfiles.theGoods, { name: 'theGoods.mp3' });
            await message.reply({ content: 'Credit: Benpai', files: [file] });
        })
        .setAutocomplete(async (_interaction, _client) => { /* Do Stuff Here */ });
