const { AttachmentBuilder, EmbedBuilder } = require('discord.js');

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
            if (message.author == client.user) return;
            const logs = client.channels.cache.get('1078742960197357658');
            const files = []
            for (const attachment of message.attachments.values()) {
                files.push(new AttachmentBuilder(attachment.url));
            }
            const embed = new EmbedBuilder()
                .setTitle('New Messwage')
                .setDescription(message.content || 'No Content')
                .setAuthor({
                    name: message.author.tag,
                    iconURL: message.author.avatarURL({ size: 256 })
                })
                .setTimestamp()
                .setColor(0x000000)
                .setFooter({
                    text: message.author.id
                });
            await logs.send({ embeds: [embed], files, });
        }
        // detect if the message replies to the bot
        if (message.mentions.has(client.user) && message.type == 19) {
            await message.channel.messages.fetch(message.reference.messageId).then(async msg => {
                if (msg.embeds.length !== 1) return;
                if (!msg.embeds[0].footer) return;
                const files = []
                for (const attachment of message.attachments.values()) {
                    files.push(new AttachmentBuilder(attachment.url));
                }
                const embed = msg.embeds[0];
                const sendID = embed.footer.text;
                (await client.users.cache.get(sendID).createDM(true)).send({
                    content: `UwU you have a new reply!\n\n>>> ${message.content || '(No content was given)'}`,
                    files,
                })
            });
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
            case 'astolfo':
                await fetch('https://www.reddit.com/r/astolfo/random/.json')
                    .then(response => response.json())
                    .then(data => {
                        const validLinks = data.data.children.filter(post => post.data.post_hint == 'image');
                        const randomLink = validLinks[Math.floor(Math.random() * validLinks.length)];
                        const embed = new EmbedBuilder()
                            .setTitle(randomLink.data.title)
                            .setURL(randomLink.data.url)
                            .setImage(randomLink.data.url)
                            .setTimestamp()

                        message.reply({ embeds: [embed] });
                    })
                break;
            case 'thebo':
                const { thebo } = require('../online_assets.json')
                const selection2 = Math.floor(Math.random() * thebo.length) - 1;
                await message.reply(thebo[selection2]);
                break;
            case 'thegoods':
                const file = new AttachmentBuilder(client.sfiles.theGoods, { name: 'theGoods.mp3' });
                await message.reply({ files: [file] });
                break;
            case 'about':
            case 'info':
            case 'details':
                const imageURL = "https://cdn.discordapp.com/attachments/1078326760539684864/1089361508196159609/IMG_2351.png" // Developer Note: I typed this out by hand. Stupid school blocks Discord.
                const embed = new EmbedBuilder()
                    .setAuthor(
                        {
                            name: 'FemDevs',
                            iconURL: imageURL,
                            url: 'https://github.com/FemDevs'
                        }
                    )
                    .setTitle('About the bot')
                    .setDescription('This is a private bot originally created by Alex. We then moved it over to FemDevs, which includes Benpai and Oblong too.')
                    .addFields(
                        {
                            name: 'Developers',
                            value: [
                                '<@505458216474378271> - Oblong',
                                '<@530748350119673896> - Alex',
                                '<@957352586086875216> - Benpai'
                            ].join('\n')
                        }
                    )
                    .setFooter(
                        {
                            text: 'Made with humor by FemDevs',
                            iconURL: imageURL
                        }
                    )
                    .setTimestamp()
                    .setColor(Math.floor(Math.random() * Math.pow(16, 6)))
                await message.reply({ embeds: [embed] });
            default:
                break;
        }
    }
}