const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { Discord: { Initializers: { Command } } } = require('@therealbenpai/djs-client').Utils;
module.exports =
    new Command(
        'NAME',
        [],
        new Command.Info({
            type: 'Development',
            description: '',
            usage: '',
            examples: [''],
            disabled: false,
        }),
        new Command.Restrictions({
            perm: PermissionFlagsBits.Administrator,
            channels: [],
            roles: [],
            users: [],
            dms: true,
        }),
        { slash: true, text: true},
        new SlashCommandBuilder()
            .setName('NAME')
            .setDescription('DESCRIPTION'),
    )
        .setCommand(async (client, interaction) => { /* Do Stuff Here */ })
        .setMessage(async (client, message) => { /* Do Stuff Here */ })
        .setAutocomplete(async (client, interaction) => { /* Do Stuff Here */ });