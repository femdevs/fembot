const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: 'guildMemberAdd',
  /**
   * 
   * @param {import('discord.js').Client} client 
   * @param {import('discord.js').GuildMember} member 
   * @returns
   */
  async execute(client, member) {
    const welcomeChannelId = '1125106402264879196'
    const welcomeChannel = await client.channels.fetch(welcomeChannelId)
    const avatarURL = member.displayAvatarURL()
    const welcomeEmbed = new EmbedBuilder()
      .setTitle(`${member.displayName} joined!`)
      .setDescription('Welcome! Please read the server rules before chatting with other members. Have fun!')
      .setThumbnail(avatarURL)
      .setColor('Blurple')
    await welcomeChannel.send({ embeds: [welcomeEmbed] })
  }
}