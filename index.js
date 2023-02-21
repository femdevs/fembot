const { Client, Partials, AttachmentBuilder } = require('discord.js');

const client = new Client({
    intents: [
        1, // GatewayIntents.GUILDS
        2, // GatewayIntents.GUILD_MEMBERS
        4, // GatewayIntents.GUILD_BANS
        8, // GatewayIntents.GUILD_EMOJIS_AND_STICKERS
        16, // GatewayIntents.GUILD_INTEGRATIONS
        32, // GatewayIntents.GUILD_WEBHOOKS
        64, // GatewayIntents.GUILD_INVITES
        128, // GatewayIntents.GUILD_VOICE_STATES
        256, // GatewayIntents.GUILD_PRESENCES
        512, // GatewayIntents.GUILD_MESSAGES
        1024, // GatewayIntents.GUILD_MESSAGE_REACTIONS
        2048, // GatewayIntents.GUILD_MESSAGE_TYPING
        4096, // GatewayIntents.DIRECT_MESSAGES
        8192, // GatewayIntents.DIRECT_MESSAGE_REACTIONS
        16384 // GatewayIntents.DIRECT_MESSAGE_TYPING
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.User
    ]
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction;
    switch (commandName) {
        case 'ping':
            await interaction.reply('Pong!');
            break;
        case 'help':
            await interaction.reply('Commands: !help, !astolfo, !thebo, !thegoods');
            break;
        case 'alstolfo':
            const { astolfo } = require('./online_assets.json')
            const selection = Math.floor(Math.random() * astolfo.length);
            await interaction.reply(astolfo[selection]);
            break;
        case 'thebo':
            const { thebo } = require('./online_assets.json')
            const selection2 = Math.floor(Math.random() * thebo.length);
            await interaction.reply(thebo[selection2]);
            break;
        case 'thegoods':
            const file = new AttachmentBuilder(require('fs').readFileSync('./the_goods.mp3'));
            await interaction.reply({ files: [file] });
            break;
        default:
            break;
    }
});

client.on('messageCreate', async message => {
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
            const { astolfo } = require('./online_assets.json')
            const selection = Math.floor(Math.random() * astolfo.length) - 1;
            await message.reply(astolfo[selection]);
            break;
        case 'thebo':
            const { thebo } = require('./online_assets.json')
            const selection2 = Math.floor(Math.random() * thebo.length) - 1;
            await message.reply(thebo[selection2]);
            break;
        case 'thegoods':
            const file = new AttachmentBuilder(require('fs').readFileSync('./the_goods.mp3'));
            await message.reply({ files: [file] });
            break;
        default:
            break;
    }
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login("MTA3NzI0MDMxMTg3NDU5Njk0NQ.GLnGUD.ssM6dK_yhvm_v55yaUtCHsqqhHZaR8HIQ98dIc");