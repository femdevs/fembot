const { Events } = require('discord.js');
const { Discord: { Initializers: { Event } } } = require('../modules/util.js');

module.exports = new Event(Events.ClientReady)
    .setExecute(async (client) => {
        const cs = {
            ping: Math.max(client.ws.ping, 0),
            guilds: client.guilds.cache.size,
            users: client.users.cache.size,
            channels: client.channels.cache.size,
            commands: client.Commands.size,
            components: {
                contextMenus: client.Components.get('contextMenus').size,
                buttons: client.Components.get('buttons').size,
                selectMenus: client.Components.get('selectMenus').size,
                modals: client.Components.get('modals').size,
            },
            events: client.Events.size,
            triggers: client.Triggers.size,
        };
        Array
            .of(`Logged in as {red ${client.user.username}}!`)
            .concat(Array.of(
                `Ping: {rgb(255,127,0) ${cs.ping} ms}`,
                `Guilds: {yellow ${cs.guilds}}`,
                `Users: {green ${cs.users}}`,
                `Channels: {blue ${cs.channels}}`,
                `Commands: {rgb(180,0,250) ${cs.commands}}`,
                `Components: {rgb(255,100,100) ${Object.values(cs.components)
                    .reduce(client.Utils.Reduce.add)
                }}`,
                `Events: {white ${cs.events}}`,
                `Triggers: {grey ${cs.triggers}}`,
                `Pre-defined messages: {cyan ${client.PredefinedMessages.size}}`,
                `Statuses selection size: {rgb(0,255,255) ${client.statuses.size}}`,
            )
                .map((m) => `Current ${m}`))
            .map((m) => `{bold [READY]} ${m}`)
            .forEach((m) => import('chalk-template').then(({ template }) => console.log(template(m))));
        setInterval(() => client.user.setPresence({ activities: [client.statuses.random()] }), 15e3);
    });
