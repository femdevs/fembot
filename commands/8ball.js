const { SlashCommandBuilder } = require('discord.js');
const { Discord: { Initializers: { Command } } } = require('@therealbenpai/djs-client').Utils;

module.exports =
    new Command(
        'ball',
        ['ball'],
        new Command.Info({
            type: 'Fun',
            description: 'Get a random response to your question',
            usage: 'ball <question>',
            examples: ['ball', 'ball am I cool?'],
            disabled: false,
        }),
        new Command.Restrictions({
            dms: true,
        }),
        { slash: true, text: true },
        new SlashCommandBuilder()
            .setName('ball')
            .setDescription('Get a random response to your question')
            .addStringOption(option =>
                option
                    .setName('question')
                    .setDescription('The question to ask the 8ball')
                    .setRequired(false)
            ),
    )
        
        .setCommand(async (client, interaction) => {
            const response = await client.Database.prepare('SELECT * FROM ball ORDER BY RANDOM() LIMIT 1').get();
            const colors = [
                0x3ac112,
                0x888888,
                0xac1212
            ]
            // Rows: id, aff, text
            const embed = client.embed()
                .setTitle('🎱 8ball')
                .setDescription(`**Question:** ${interaction.options.getString('question')}\n**Response:** ${response.text}`)
                .setColor(colors[response.aff]);
            interaction.reply({ embeds: [embed] });
        })
        .setMessage(async (client, message) => {
            const response = await client.Database.prepare('SELECT * FROM ball ORDER BY RANDOM() LIMIT 1').get();
            const colors = [
                0x3ac112,
                0x888888,
                0xac1212
            ]
            const formatted = message.content.split(' ').slice(1).join(' ');
            // Rows: id, aff, text
            const embed = client.embed()
                .setTitle('🎱 8ball')
                .setDescription(`${formatted ? `**Question:** ${formatted}\n` : ''}**Response:** ${response.text}`)
                .setColor(colors[response.aff]);
            message.channel.send({ embeds: [embed] });
        })
        .setAutocomplete(async (client, interaction) => { /* Do Stuff Here */ });