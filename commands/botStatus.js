const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const os = require('os')

module.exports = {
    name: 'botstatus',
    data: new SlashCommandBuilder()
        .setName('botstatus')
        .setDescription('Bot Status'),
    async execute(client, interaction) {
        const data = {
            uptime: client.Utils.Time.elapsedTime(process.uptime()),
            ping: client.ws.ping,
            cpu: (os.cpus().map(cpu => ((cpu.times.user + cpu.times.sys) / cpu.times.idle) * 100).reduce((a, b) => a + b, 0) / os.cpus().length).toFixed(2),
            memory: ((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024).toFixed(2)
        }
        const embed = new EmbedBuilder()
            .setTitle('Bot Status')
            .setColor(parseInt(client.Utils.Random.randHex(), 16))
            .setDescription('Bot Status')
            .setFooter({
                text: 'Bot Status | Made by FemDevs',
            })
            .setTimestamp()
            .addFields(
                {
                    name: 'Uptime',
                    value: data.uptime
                },
                {
                    name: 'Ping',
                    value: data.ping + 'ms'
                },
                {
                    name: 'CPU',
                    value: data.cpu + '%'
                },
                {
                    name: 'Memory',
                    value: data.memory + 'GB'
                }
            )
        interaction.reply({ embeds: [embed] })
    }
}