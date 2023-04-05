const { AttachmentBuilder, EmbedBuilder, ChannelType, Guild } = require('discord.js');
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
        const allowedChannelTypes = [
            ChannelType.GuildText,
            ChannelType.DM,
            ChannelType.GuildVoice,
            ChannelType.GuildStageVoice,
            ChannelType.GuildForum,
            ChannelType.GuildAnnouncement,
            ChannelType.PublicThread,
            ChannelType.PrivateThread,
        ]
        if (!allowedChannelTypes.includes(message.channel.type)) return;
        if (message.content.startsWith(client.config.prefix)) {
            const commandText = message.content.slice(client.config.prefix.length).trim().split(/ +/g).shift().toLowerCase();
            const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
            for (const file of commandFiles) {
                const command = require(`../commands/${file}`);
                if (!command.type?.text || !command.triggers) continue;
                if (!command.triggers.includes(commandText)) continue;
                if (command.channelLimits && !command.channelLimits.includes(message.channel.type)) {
                    message.reply('This command cannot be used in this channel type!');
                    break;
                }
                if (message.guild && command.requiredPermissions && !message.member.permissions.has(command.requiredPermissions, true)) {
                    message.reply('You do not have the required permissions to use this command!');
                    break;
                }
                if (command.disabled) return message.reply({ content: 'This command is disabled!', ephemeral: true });
                const args = message.content.trim().split(/ /gmi).slice(1);
                command.messageExecute(client, message, args);
                break;
            }
            return;
        }
        if (message.channel.isDMBased()) {
            if (message.author.bot) return;
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
        if (message.mentions.has(client.user) && message.type == 19 && message.channel.id === '1078742960197357658') {
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

    }
}