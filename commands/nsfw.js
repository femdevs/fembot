const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
    .setName('nsfw')
    .setDescription('NSFW commands')
    .addSubcommand(subcommand =>
        subcommand
            .setName('astolfo')
            .setDescription('Take a guess'))
    .addSubcommand(subcommand =>
        subcommand
            .setName('thebo')
            .setDescription('Take a guess'))
    .addSubcommand(subcommand =>
        subcommand
            .setName('thegoods')
            .setDescription('Take a guess'));
data.nsfw = true;
module.exports = {
    name: 'nsfw',
    data,
    async execute(client, interaction) {
    }
}

