const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { Discord: { Initializers: { Command } } } = require('@therealbenpai/djs-client').Utils;
const barcode = require('bwip-js');
const SQLite = require('better-sqlite3');

const Database = new SQLite('./database.db');

const genBarcode = async (fmt, data) => await barcode.toBuffer({
    bcid: fmt,
    text: data,
    scale: 3,
    includetext: true,
    textxalign: 'center',
    textsize: 16,
    textyoffset: 10,
    paddingheight: 2,
    paddingwidth: 2,
    backgroundcolor: 'FFFFFF',
    color: '000000',
    barcolor: '000000',
});

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
        { slash: true, text: true},
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
        .setCommand(async (client, interaction) => {
            const type = interaction.options.getString('type');
            const data = interaction.options.getString('data');
            await interaction.deferReply()
            try {
                const bcode = await genBarcode(type, data)

                return interaction.editReply({
                    files: [
                        new AttachmentBuilder(bcode, { name: `${type}-${require('uuid').v4()}.png` })
                    ]
                });
            }
            catch {
                return interaction.editReply({
                    embeds: [
                        client.embed()
                            .setTitle('Data Invalid')
                            .setDescription('The data you provided is invalid for')
                            .setColor(0x660000)
                            .setFooter({ text: 'Please check the constraints for the barcode type you selected.' })
                    ]
                });
            }
        })
        .setMessage(async (client, message) => {
            const args = message.content.trim().split(/ +/g).slice(1);
            const type = args[0];
            const data = args.slice(1).join(' ');
            const types = Database.prepare('SELECT barcodeKey AS value FROM barcodes').all().map(({ value }) => value)
            if (!types.includes(type)) return message.reply({
                embeds: [
                    client.embed()
                        .setTitle('Type Invalid')
                        .setDescription('The barcode type you provided is invalid')
                        .setColor(0x660000)
                ]
            })
            try {
                const bcode = await genBarcode(type, data)

                return message.reply({
                    files: [
                        new AttachmentBuilder(bcode, { name: `${type}-${require('uuid').v4()}.png` })
                    ]
                });
            }
            catch {
                return message.reply({
                    embeds: [
                        client.embed()
                            .setTitle('Data Invalid')
                            .setDescription('The data you provided is invalid for')
                            .setColor(0x660000)
                            .setFooter({ text: 'Please check the constraints for the barcode type you selected.' })
                    ]
                });
            }
        })
        .setAutocomplete(async (client, interaction) => {
            const codes = Database.prepare('SELECT barcodeKey AS value, barcodeName AS name FROM barcodes').all()
            return interaction.respond(
                (
                    new client.Fuse(codes, {
                        threshold: 0.3, findAllMatches: true,
                        ignoreLocation: true, useExtendedSearch: true,
                        keys: ['name', 'value']
                    }, client.BCTIndex)
                )
                    .search(interaction.options.getFocused())
                    .map(({ item: { name, value } }) => ({ name, value }))
                    .slice(0, 25)
            );
        });
