const chalk = require('chalk')
const { ActivityType } = require('discord.js')

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        const stats = {
            ping: client.ws.ping,
            servers: client.guilds.cache.size,
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
                console.log(`Ping: ${chalk.red.underline.bold(stats.ping + "ms")}`);
                break;
        }
        console.log()
        console.log(`Servers: ${chalk.underline.bold.blue(stats.servers)}`);
        console.log()
        console.log(`Users: ${chalk.underline.bold.blue(stats.users)}`);
        console.log()
        console.log(chalk`Logged In as ${chalk.underline.bold.blue(stats.name)}`);
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