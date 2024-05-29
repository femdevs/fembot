const { SlashCommandBuilder } = require('discord.js');
const { Discord: { Initializers: { Command } } } = require('@therealbenpai/djs-client').Utils
module.exports =
    new Command(
        'whois',
        ['whois', 'userinfo', 'user', 'whoami'],
        new Command.Info({
            type: 'Utility',
            description: 'Get information about a user.',
            usage: 'whois <user>',
            examples: ['whois @user', 'whois 123456789012345678'],
            disabled: false,
        }),
        new Command.Restrictions({ dms: true }),
        { slash: true, text: true },
        new SlashCommandBuilder()
            .setName('whois')
            .setDescription('Get information about a user.')
            .addUserOption(option =>
                option
                    .setName('member')
                    .setDescription('The user to get information about.')
                    .setRequired(false)
            ),
    )
        .setCommand(async (client, interaction) => {
            const member = interaction.options.getMember('member') || interaction.member;
            const user = interaction.options.getUser('member') || interaction.user;
            const roles = member.roles.cache.map(role => role.toString()).slice(0, 35).join('\n- ').replace(/<[^>]$/m, '')
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
                            name: `Roles [${member.roles.cache.size}${member.roles.cache.size > 35 ? ' ==> limited to 35 <==' : ''}]`,
                            value: `- ${roles}${roles.endsWith('@everyone') ? '' : ', and more...'}\n`,
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
        .setMessage(async (client, message) => {
            const member = message.mentions.members.first() || message.member;
            const user = message.mentions.users.first() || message.author;
            const roles = member.roles.cache.map(role => role.toString()).slice(0, 35).join('\n- ').replace(/<[^>]$/m, '')
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
                            name: `Roles [${member.roles.cache.size}${member.roles.cache.size > 35 ? ' ==> limited to 35 <==' : ''}]`,
                            value: `- ${roles}${roles.endsWith('@everyone') ? '' : ', and more...'}\n`,
                            inline: true
                        },
                    ]);
                await message.channel.send({ embeds: [userEmbed] })
            } catch (error) {
                const error_embed = client.embed()
                    .setTitle('Error')
                    .setDescription(`It seems we encountered an error:\n\`${error}\``)
                await message.channel.send({ embeds: [error_embed] });
                console.error(error);
            }
        })
        .setAutocomplete(async (_interaction, _client) => { /* Do Stuff Here */ });
