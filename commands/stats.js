const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'help',
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Take a guess'),
    async execute(client, interaction) {
        client.db.query(`SELECT * FROM users WHERE discordId = ${interaction.user.id}`, (err, rows) => {
            if (err) throw err;
            interaction.reply({ content: `You have ran ${rows[0].commandsRan} commands!` });
        });
    }
}