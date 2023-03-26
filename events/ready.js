const chalk = require('chalk');

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
        switch (Math.floor(stats.ping / 100)) {
            case 1:
                console.log(chalk.green(`Ping: ${stats.ping}ms`));
                break;
            case 2:
                console.log(chalk.yellow(`Ping: ${stats.ping}ms`));
                break;
            case 3:
                console.log(chalk.red(`Ping: ${stats.ping}ms`));
                break;
        }
        console.log(chalk.blue(`Servers: ${stats.servers}`));
        console.log(chalk.blue(`Users: ${stats.users}`));
        console.log(chalk.blue(`Loged In as ${stats.name}`));

    }
}