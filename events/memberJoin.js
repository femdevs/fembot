const { Events } = require('discord.js');
const { Discord: { Initializers: { Event } } } = require('../modules/util.js');
module.exports = new Event(Events.GuildMemberAdd)
    .setExecute(async (client, member) => {
        const welcomeChannelId = '1125106402264879196'
        const welcomeChannel = await client.channels.fetch(welcomeChannelId)
        const avatarURL = member.displayAvatarURL()
        const welcomeEmbed = client.embed()
            .setTitle(`${member.displayName} joined!`)
            .setDescription('Welcome! Please read the server rules before chatting with other members. Have fun!')
            .setThumbnail(avatarURL)
            .setColor('Blurple')
        await welcomeChannel.send({ embeds: [welcomeEmbed] })
    });
