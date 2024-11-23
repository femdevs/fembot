const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { Discord: { Initializers: { Command } } } = require('@therealbenpai/djs-client').Utils;
module.exports =
    new Command(
        'role',
        ['role'],
        new Command.Info({
            type: 'Management',
            description: 'Manage roles for a user.',
            usage: 'role <add|remove|list|toggle> <user> (role)',
            examples: [''],
            disabled: false,
        }),
        new Command.Restrictions({ perm: PermissionFlagsBits.ManageRoles, dms: true }),
        { slash: true, text: true},
        new SlashCommandBuilder()
            .setName('role')
            .setDescription('Manage roles for a user.')
            .addSubcommand(subcommand =>
                subcommand
                    .setName('add')
                    .setDescription('Add a role to a user.')
                    .addUserOption(option =>
                        option
                            .setName('member')
                            .setDescription('The user to add the role to')
                            .setRequired(true))
                    .addRoleOption(option =>
                        option
                            .setName('role')
                            .setDescription('The role to add to the user')
                            .setRequired(true)
                    )
            )
            .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
    )
        .setCommand(async (client, interaction) => {
            switch (interaction.options.getSubcommand()) {
                case 'add':
                    const member = interaction.options.getMember('member');
                    const role = interaction.options.getRole('role');
                    try {
                        await member.roles.add(role);
                        await interaction.reply({
                            embeds: [client.embed()
                                .setTitle('Success!')
                                .setDescription(`${member} has been given the role ${role}.`)
                                .setColor(0x3dd11b)]
                        });
                    } catch (error) {
                        await interaction.reply({
                            embeds: [client.embed()
                                .setTitle('Error')
                                .setDescription(`It seems we encountered an error:\n\`${error}\``)
                                .setColor(0xd1271b)]
                        })
                        console.error(error);
                    }
            }
        })
        .setMessage(async (_message, _client) => { /* Do Stuff Here */ })
        .setAutocomplete(async (client, interaction) => { /* Do Stuff Here */ });
