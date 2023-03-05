const { AttachmentBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {
        if (!interaction.isCommand()) return;
        const { commandName, user } = interaction;
        client.db.query(`SELECT * FROM users WHERE discordId = ${user.id}`, (err, rows) => {
            if (err) throw err;
            if (rows.length < 1) {
                client.db.query(`INSERT INTO users (discordId, commandsRan) VALUES ('${user.id}', 1)`, (err, rows) => {
                    if (err) throw err;
                });
            } else {
                client.db.query(`UPDATE users SET commandsRan = ${rows[0].commandsRan + 1} WHERE discordId = ${user.id}`, (err, rows) => {
                    if (err) throw err;
                });
            }
        });
        fs.readdirSync(process.cwd() + '/commands').forEach(file => {
            if (!file.endsWith('.js')) return;
            const command = require(`../commands/${file}`);
            if (commandName === command.name) {
                try {
                    command.execute(client, interaction);
                } catch (error) {
                    interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                    console.error(error);
                }
                return
            }
        })
    }
}
