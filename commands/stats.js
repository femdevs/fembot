const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'stats',
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Check how many times you have ran a command!'),
    async execute(client, interaction) {
        // client.db.query(`SELECT * FROM users WHERE discordId = ${interaction.user.id}`, (err, rows) => {
        //     if (err) throw err;
        //     if (rows.length < 1) return interaction.reply({ content: 'You have not ran any commands yet!' });
        //     interaction.reply({ content: `You have ran ${rows[0].commandsRan} commands!` });
        // });
        interaction.reply({ content: 'This command is currently disabled!' });
    }
}