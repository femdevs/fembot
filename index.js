const { Client, Partials, AttachmentBuilder, GatewayIntentBits } = require('discord.js');

const staticFiles = {
    theGoods: require('fs').readFileSync('./the_goods.mp3')
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessageReactions
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.User,
        Partials.GuildScheduledEvent,
        Partials.ThreadMember
    ]
});

client.on('interactionCreate', async (interaction) => {
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
            const file = new AttachmentBuilder(staticFiles.theGoods, {name: 'theGoods.mp3'});
            await interaction.reply({ files: [file] });
            break;
        default:
            break;
    }
});

client.on('messageCreate', async (message) => {
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
            const file = new AttachmentBuilder();
            await message.reply({ files: [file.setName('theGoods.mp3')] });
            break;
        default:
            break;
    }
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login("MTA3NzI0MDMxMTg3NDU5Njk0NQ.GLnGUD.ssM6dK_yhvm_v55yaUtCHsqqhHZaR8HIQ98dIc");