const chalk = require('chalk')
const { ActivityType } = require('discord.js')

module.exports = {
    name: 'ready',
    once: true,
    /**
     * 
     * @param {import('discord.js').Client} client 
     */
    async execute(client) {
        const stats = {
            ping: client.ws.ping,
            servers: client.guilds.cache.size,
            server_names: client.guilds.cache.map(guild => guild.name),
            users: client.users.cache.size,
            name: client.user.tag,
        }
        switch (Math.ceil(stats.ping / 100)) {
            case 1:
                console.log(`Ping: ${chalk.green(stats.ping + "ms")}`);
                break;
            case 2:
                console.log(`Ping: ${chalk.yellow(stats.ping + "ms")}`);
                break;
            case 3:
                console.log(`Ping: ${chalk.red(stats.ping + "ms")}`);
                break;
            default:
                console.log(`Ping: ${chalk.red.underline.bold(stats.ping + "ms")}\n`);
                break;
        }
        console.log(`Servers: ${chalk.underline.bold.blue(stats.servers)}\n`);
        console.log(`Server Names: ${chalk.underline.bold.blue(stats.server_names)}\n`);
        console.log(`Users: ${chalk.underline.bold.blue(stats.users)}\n`);
        console.log(chalk`Logged In as ${chalk.underline.bold.blue(stats.name)}\n`);
        client.user.setPresence({
            activities: [
                {
                    name: stats.servers > 1 ? `${stats.servers} Servers` : `1 Server`,
                    type: ActivityType.Watching
                }
            ]
        })
    }
}