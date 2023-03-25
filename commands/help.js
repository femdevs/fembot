const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'help',
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Take a guess'),
    async execute(client, interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Help')
            .setDescription('The command prefix is \'!\'')
            .addFields(
                {name: 'help', value: 'Throw this help message.'},
                {name: 'astolfo', value: 'Fetch an image of astolfo from reddit.'},
                {name: 'thebo', value: 'THE BO FOREVER'},
                {name: 'ping', value: 'Replies with pong.'},
                {name: 'reset', value: 'Reset the current channel.'},
                {name: 'stats', value: 'See how many commands you\'ve run.'},
                {name: 'thegoods', value: 'Furry.'},
            )
            .setColor(255, 255, 255)
        await interaction.reply({embeds: [embed] });
    }
}