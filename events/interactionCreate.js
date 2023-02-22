const { AttachmentBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {
        if (!interaction.isCommand()) return;
        const { commandName } = interaction;
        fs.readdirSync('../commands').forEach(file => {
            if (!file.endsWith('.js')) return;
            const command = require(`../commands/${file}`);
            if (commandName === command.name) {
                command.execute(client, interaction);
                return
            }
        })
    }
}
