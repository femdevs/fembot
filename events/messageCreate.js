const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'messageCreate',
    /**
     * 
     * @param {import('discord.js').Message} message 
     * @param {import('discord.js').Client} client 
     * @returns 
     */
    async execute(client, message) {
        if (message.channel.isDMBased()) {
            const logs = client.channels.cache.get('1040327100181270679');
            const embed = new EmbedBuilder()
                .setTitle('New Messwage')
                .setDescription(message.content)
                .setAuthor({
                    name: message.author.tag,
                    iconURL: message.author.avatarURL({ size: 256 })
                })
                .setTimestamp()
                .setColor(0x000000)
                .setFooter({
                    text: message.author.id
                });
            await logs.send({ embeds: [embed] });
        }
        // detect if the message replies to the bot
        if (message.mentions.has(client.user) && !message.content.includes(`${client.user}`)) {
            if (message.embeds.length !== 1) return;
            const embed = message.embeds[0];
            const sendID = embed.footer.text;
            const sendChannel = client.users.cache.get(sendID).dmChannel.send({
                content: `UwU you have a new reply!\n\n>>>${message.content}`
            })
        }

        if (!message.content.startsWith("!") || message.author.bot) return;
        const args = message.content.replace('!', '').trim().split(' ');
        const command = args.shift().toLowerCase();
        switch (command) {
            case 'ping':
                await message.reply('Pong!');
                break;
            case 'help':
                await message.reply('Commands: !help, !astolfo, !thebo, !thegoods');
                break;
            case 'alstolfo':
                const { astolfo } = require('../online_assets.json')
                const selection = Math.floor(Math.random() * astolfo.length) - 1;
                await message.reply(astolfo[selection]);
                break;
            case 'thebo':
                const { thebo } = require('../online_assets.json')
                const selection2 = Math.floor(Math.random() * thebo.length) - 1;
                await message.reply(thebo[selection2]);
                break;
            case 'thegoods':
                const file = new AttachmentBuilder(AttachmentBuilder(client.sfiles.theGoods, {name: 'theGoods.mp3'}));
                await message.reply({ files: [file.setName('theGoods.mp3')] });
                break;
            default:
                break;
        }
    }
}