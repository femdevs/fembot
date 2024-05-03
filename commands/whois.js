const { SlashCommandBuilder } = require('discord.js');
const { Discord: { Initializers: { Command } } } = require('../modules/util.js');
module.exports =
    new Command(
        'whois',
        [],
        new Command.Info({
            type: 'Utility',
            description: 'Get information about a user.',
            usage: 'whois <user>',
            examples: ['whois @user', 'whois 123456789012345678'],
            disabled: false,
        }),
        new Command.Restrictions({ dms: true }),
        { slash: true, text: false },
        new SlashCommandBuilder()
            .setName('whois')
            .setDescription('Get information about a user.'),
    )
        .setCommand(async (interaction, client) => {
            const member = interaction.options.getMember('member');
            const user = interaction.options.getUser('member');
            try {
                const userEmbed = client.embed()
                    .setTitle(user.tag)
                    .setThumbnail(user.displayAvatarURL())
                    .addFields([
                        {
                            name: '_ _',
                            value: `**User ID:** \`${user.id}\`\n**Joined Discord:** <t:${Math.floor(user.createdTimestamp / 1000)}:f>\n**Joined Server:** <t:${Math.floor(member.joinedTimestamp / 1000)}:f>`,
                            inline: false
                        },
                        {
                            name: `Roles [${member.roles.cache.size}]`,
                            value: `${member.roles.cache.map(role => role.toString()).join(' ')}\n`,
                            inline: true
                        },
                    ]);
                await interaction.reply({ embeds: [userEmbed] })
            } catch (error) {
                const error_embed = client.embed()
                    .setTitle('Error')
                    .setDescription(`It seems we encountered an error:\n\`${error}\``)
                await interaction.reply({ embeds: [error_embed] });
                console.error(error);
            }
        })
        .setMessage(async (message, client) => { /* Do Stuff Here */ })
        .setAutocomplete(async (_interaction, _client) => { /* Do Stuff Here */ });
