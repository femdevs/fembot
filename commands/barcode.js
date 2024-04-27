const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, AttachmentBuilder } = require('discord.js');
const barcodes = require('bwip-js');

module.exports = {
    name: 'barcode',
    type: {
        command: true,
        text: false
    },
    data: new SlashCommandBuilder()
        .setName('barcode')
        .setDescription('Create a barcode from a string.')
        .addStringOption(option =>
            option
                .setName('type')
                .setDescription('Choose the type of barcode you want to create.')
                .setRequired(true)
                .setChoices(
                    ...(
                        require('fs')
                            .readFileSync('sbcs.txt', 'utf-8')
                            .split('\n')
                            .map(l => ({ name: l.split(' • ')[1], value: l.split(' • ')[0] }))
                    )
                )
        )
        .addStringOption(option =>
            option
                .setName('data')
                .setDescription('The data to encode in the barcode.')
                .setRequired(true)
        ),
    /**
     * 
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').ChatInputCommandInteraction} interaction 
     * @returns 
     */
    async execute(client, interaction) {
        const type = interaction.options.getString('type');
        const data = interaction.options.getString('data');
        const errorEmbed = new EmbedBuilder()
            .setTitle('Data Invalid')
            .setDescription('The data you provided is invalid for')
            .setColor(0x660000)
            .setFooter({
                text: 'Please check the constraints for the barcode type you selected.'
            })
        // Constraints
        /*
        Codes:
            azteccode • Aztec Code
            code11 • Code 11
            code128 • Code 128
            code39 • Code 39
            code49 • Code 49
            code93 • Code 93
            datamatrix • Data Matrix
            dotcode • DotCode
            ean2 • EAN-2 (2 digit addon)
            ean5 • EAN-5 (5 digit addon)
            ean8 • EAN-8
            isbn • ISBN
            itf14 • ITF-14
            maxicode • MaxiCode
            onecode • USPS Intelligent Mail
            pdf417 • PDF417
            pharmacode • Pharmaceutical Binary Code
            qrcode • QR Code
            rationalizedCodabar • Codabar
            raw • Custom 1D symbology
            symbol • Miscellaneous symbols
            ultracode • Ultracode
            upca • UPC-A
            upce • UPC-E
        */
        switch (type) {
            case 'azteccode':
                if (
                    data.length > 3000
                    || !/^[0-9A-Z $%*+\-./:]*$/.test(data)
                ) return interaction.reply({embeds: [errorEmbed.setDescription(errorEmbed.description + ' an Aztec Code.')]});
                break;
            case 'code11':
                if (
                    data.length > 80
                    || !/^[0-9\-]*$/.test(data)
                    || !data.includes('-')
                    || data.split('-').some(d => d.length > 10 || d.length < 2 || d.length % 2 !== 0)
                ) return interaction.reply({embeds: [errorEmbed.setDescription(errorEmbed.description + ' a Code 11.')]});
                break;
            case 'code128':
                if (
                    data.length > 80
                    || !/^[0-9A-Z]*$/.test(data)
                ) return interaction.reply({embeds: [errorEmbed.setDescription(errorEmbed.description + ' a Code 128.')]});
                break;
            case 'code39':
                if (
                    data.length > 80
                    || !/^[0-9A-Z $%*+\-./]*$/.test(data)
                ) return interaction.reply({embeds: [errorEmbed.setDescription(errorEmbed.description + ' a Code 39.')]});
                break;
            case 'code49':
                if (
                    data.length > 80
                    || !/^[0-9A-Z]*$/.test(data)
                ) return interaction.reply({embeds: [errorEmbed.setDescription(errorEmbed.description + ' a Code 49.')]});
                break;
            case 'code93':
                if (
                    data.length > 80
                    || !/^[0-9A-Z $%*+\-./]*$/.test(data)
                ) return interaction.reply({embeds: [errorEmbed.setDescription(errorEmbed.description + ' a Code 93.')]});
                break;
            case 'datamatrix':
                if (
                    data.length > 3000
                    || !/^[0-9A-Z $%*+\-./:]*$/.test(data)
                ) return interaction.reply({embeds: [errorEmbed.setDescription(errorEmbed.description + ' a Data Matrix.')]});
                break;
            case 'dotcode':
                if (
                    data.length > 80
                    || !/^[0-9A-Z]*$/.test(data)
                ) return interaction.reply({embeds: [errorEmbed.setDescription(errorEmbed.description + ' a DotCode.')]});
                break;
            case 'ean2':
                if (
                    data.length > 2
                    || !/^[0-9]*$/.test(data)
                ) return interaction.reply({embeds: [errorEmbed.setDescription(errorEmbed.description + ' an EAN-2.')]});
                break;
            case 'ean5':
                if (
                    data.length > 5
                    || !/^[0-9]*$/.test(data)
                ) return interaction.reply({embeds: [errorEmbed.setDescription(errorEmbed.description + ' an EAN-5.')]});
                break;
            case 'ean8':
                if (
                    data.length > 8
                    || !/^[0-9]*$/.test(data)
                ) return interaction.reply({embeds: [errorEmbed.setDescription(errorEmbed.description + ' an EAN-8.')]});
                break;
            case 'isbn':
                if (
                    data.length > 13
                    || !/^[0-9]*$/.test(data)
                ) return interaction.reply({embeds: [errorEmbed.setDescription(errorEmbed.description + ' an ISBN.')]});
                break;
            case 'itf14':
                if (
                    data.length > 14
                    || !/^[0-9]*$/.test(data)
                ) return interaction.reply({embeds: [errorEmbed.setDescription(errorEmbed.description + ' an ITF-14.')]});
                break;
            case 'maxicode':
                if (
                    data.length > 3000
                    || !/^[0-9A-Z $%*+\-./:]*$/.test(data)
                ) return interaction.reply({embeds: [errorEmbed.setDescription(errorEmbed.description + ' a MaxiCode.')]});
                break;
            case 'onecode':
                if (
                    ![20, 25, 29, 31].includes(data.length)
                    || !/^[0-9]*$/.test(data)
                ) return interaction.reply({embeds: [errorEmbed.setDescription(errorEmbed.description + ' a USPS Intelligent Mail.')]});
                break;
            case 'pdf417':
                if (
                    data.length > 3000
                    || !/^[0-9A-Z $%*+\-./:]*$/.test(data)
                ) return interaction.reply({embeds: [errorEmbed.setDescription(errorEmbed.description + ' a PDF417.')]});
                break;
            case 'pharmacode':
                if (
                    data.length > 80
                    || !/^[0-9]*$/.test(data)
                ) return interaction.reply({embeds: [errorEmbed.setDescription(errorEmbed.description + ' a Pharmaceutical Binary Code.')]});
                break;
            case 'qrcode':
                if (
                    data.length > 3000
                    || !/^[0-9A-Z $%*+\-./:]*$/.test(data)
                ) return interaction.reply({embeds: [errorEmbed.setDescription(errorEmbed.description + ' a QR Code.')]});
                break;
            case 'rationalizedCodabar':
                if (
                    data.length > 80
                    || !/^[0-9A-D $+\-./:]*$/.test(data)
                ) return interaction.reply({embeds: [errorEmbed.setDescription(errorEmbed.description + ' a Codabar.')]});
                break;
            case 'raw':
                if (
                    data.length > 80
                    || !/^[0-9A-Z $%*+\-./:]*$/.test(data)
                ) return interaction.reply({embeds: [errorEmbed.setDescription(errorEmbed.description + ' a Custom 1D symbology.')]});
                break;
            case 'symbol':
                if (
                    data.length > 80
                    || !/^[0-9A-Z $%*+\-./:]*$/.test(data)
                ) return interaction.reply({embeds: [errorEmbed.setDescription(errorEmbed.description + ' a Miscellaneous symbols.')]});
                break;
            case 'ultracode':
                if (
                    data.length > 80
                    || !/^[0-9A-Z $%*+\-./:]*$/.test(data)
                ) return interaction.reply({embeds: [errorEmbed.setDescription(errorEmbed.description + ' an Ultracode.')]});
                break;
            case 'upca':
                if (
                    data.length > 12
                    || !/^[0-9]*$/.test(data)
                ) return interaction.reply({embeds: [errorEmbed.setDescription(errorEmbed.description + ' a UPC-A.')]});
                break;
            case 'upce':
                if (
                    data.length > 8
                    || !/^[0-9]*$/.test(data)
                ) return interaction.reply({embeds: [errorEmbed.setDescription(errorEmbed.description + ' a UPC-E.')]});
                break;
            default: return interaction.reply({embeds: [errorEmbed.setDescription('The barcode type you provided is invalid.')]});
        }
        const barcode = await barcodes.toBuffer({
            bcid: type,
            text: data,
            includetext: true,
            textxalign: 'center',
            textsize: 16,
            textyoffset: 10,
            paddingwidth: 2,
            paddingheight: 2,
            scale: 3,
            backgroundcolor: 'FFFFFF',
            barcolor: '000000',
            monochrome: true,
        });
        return interaction.reply({
            files: [
                new AttachmentBuilder(barcode, { name: `${type}-${require('uuid').v4()}.png` })
            ]
        });
    }
}