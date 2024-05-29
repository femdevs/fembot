const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
const { Discord: { Initializers: { Command } } } = require('@therealbenpai/djs-client').Utils
module.exports =
    new Command(
        'reset',
        ['reset'],
        new Command.Info({
            type: 'Management',
            description: 'Reset the channel',
            usage: 'reset',
            examples: ['reset'],
            disabled: false,
        }),
        new Command.Restrictions({
            perm: PermissionFlagsBits.ManageChannels,
            channels: [
                ChannelType.GuildText,
                ChannelType.GuildVoice,
                ChannelType.GuildAnnouncement
            ],
            dms: true,
        }),
        { slash: true, text: true },
        new SlashCommandBuilder()
            .setName('reset')
            .setDescription('Reset the channel'),
    )
        .setCommand(async (client, interaction) => {
            await interaction.reply('Resetting...');
            new Promise((r, _) => setTimeout(r, 1000))
                .then(() => {
                    interaction.channel.clone().then(channel => { channel.send('Channel reset!') })
                    interaction.channel.delete();
                })
        })
        .setMessage(async (client, message) => {
            await message.reply('Resetting...');
            new Promise((r, _) => setTimeout(r, 1000))
                .then(() => {
                    message.channel.clone().then(channel => { channel.send('Channel reset!') })
                    message.channel.delete();
                })
        })
        .setAutocomplete(async (_interaction, _client) => { /* Do Stuff Here */ });
