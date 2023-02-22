const { AttachmentBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {
        if (!interaction.isCommand()) return;
        const { commandName } = interaction;
        fs.readdirSync(process.cwd() + '/commands').forEach(async file => {
            if (!file.endsWith('.js')) return;
            const command = await require(`../commands/${file}`);
            if (commandName === command.name) {
                try {
                    await command.execute(client, interaction);
                } catch (error) {
                    interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                    console.error(error);
                }
                return
            }
        })
    }
}
