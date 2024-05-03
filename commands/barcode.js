const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { Discord: { Initializers: { Command } } } = require('../modules/util.js');
const axios = require('axios');
const {search} = require('fast-fuzzy');
const fs = require('memory-fs');
module.exports =
    new Command(
        'barcode',
        ['barcode'],
        new Command.Info({
            type: 'Utility',
            description: 'Create a barcode from a string.',
            usage: 'barcode <type> <data>',
            examples: ['barcode code128 Hello World!'],
            disabled: false,
        }),
        new Command.Restrictions(),
        { slash: true, text: true },
        new SlashCommandBuilder()
            .setName('barcode')
            .setDescription('Create a barcode from a string.')
            .addStringOption(option =>
                option
                    .setName('type')
                    .setDescription('Choose the type of barcode you want to create.')
                    .setRequired(true)
                    .setAutocomplete(true)
            )
            .addStringOption(option =>
                option
                    .setName('data')
                    .setDescription('The data to encode in the barcode.')
                    .setRequired(true)
            ),
    )
        .setCommand(async (interaction, client) => {
            const type = interaction.options.getString('type');
            const data = interaction.options.getString('data');
            const req = await axios.get(`https://api.thefemdevs.com/barcode/gen/${type}`, {
                headers: { Authorization: `Bearer ${process.env.FD_API_KEY}` },
                params: { content: data },
                responseType: 'arraybuffer'
            });
            if (!req.status === 200) return interaction.reply({ embeds: [client.embed().setTitle('Data Invalid').setDescription('The data you provided is invalid for').setColor(0x660000).setFooter({ text: 'Please check the constraints for the barcode type you selected.' })] });
            return interaction.reply({ files: [new AttachmentBuilder(req.data, { name: `${type}-${require('uuid').v4()}.png` })] });
        })
        .setMessage(async (message, client) => {
            const args = message.content.trim().split(/ +/g).slice(1);
            const type = args[0];
            const data = args.slice(1).join(' ');
            const req = await axios.get(`https://api.thefemdevs.com/barcode/gen/${type}`, {
                headers: { Authorization: `Bearer ${process.env.FD_API_KEY}` },
                params: { content: data },
                responseType: 'arraybuffer'
            });
            if (req.status !== 200) return message.reply({ embeds: [client.embed().setTitle('Data Invalid').setDescription('The data you provided is invalid for').setColor(0x660000).setFooter({ text: 'Please check the constraints for the barcode type you selected.' })] });
            return message.reply({ files: [new AttachmentBuilder(req.data, { name: `${type}-${require('uuid').v4()}.png` })] });
        })
        .setAutocomplete(async (interaction, client) => {
            const { search } = require('fast-fuzzy');
            const outputs = search(
                interaction.options.getFocused(),
                Array.from(client.BarcodeTypes)
                    .map(type => type.name)
            )
                .map(result => ({
                    name: result,
                    value: Array.from(client.BarcodeTypes).find(type => type.name === result).value
                }));
            return interaction.respond(outputs.slice(0,20))
        });
