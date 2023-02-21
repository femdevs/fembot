const {Client, GatewayIntentBits, Partials, ActivityType } = require('discord.js');
const { AttachmentBuilder } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.User
    ],
    presence: {
        status: 'online',
        activities: [
            {
                name: 'some absolute bangers',
                type: ActivityType.Listening
            }
        ]
    }
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
            await interaction.reply({files: [file]});
            break;
        default:
            break;
    }
});

client.on('messageCreate', async message => {
    const prefix = '!';
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    switch (command) {
        case 'ping':
            await message.reply('Pong!');
            break;
        case 'help':
            await message.reply('Commands: !help, !astolfo, !thebo, !thegoods');
            break;
        case 'alstolfo':
            await message.reply('Take a guess');
            break;
        case 'thebo':
            await message.reply('The bo is a bo');
            break;
        case 'thegoods':
            await message.reply('The goods are good');
            break;
        default:
            break;
    }
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login("MTA3NzI0MDMxMTg3NDU5Njk0NQ.GLnGUD.ssM6dK_yhvm_v55yaUtCHsqqhHZaR8HIQ98dIc");