const
    { GatewayIntentBits } = require('discord.js'),
    { Client } = require('@therealbenpai/djs-client'),
    { CronJob } = require('cron'),
    Fuse = require('fuse.js'),
    SQLite = require('better-sqlite3');

const Database = new SQLite('./database.db');

const cfgs = Database.prepare(`SELECT * from settings WHERE id = 1`).get()

const mainClient = new Client(
    cfgs.clientId,
    cfgs.token,
    cfgs.prefix,
    {
        buttonsDir: `${__dirname}/components/buttons`,
        commandsDir: `${__dirname}/commands`,
        contextMenusDir: `${__dirname}/components/contextMenus`,
        eventsDir: `${__dirname}/events`,
        modalComponentsDir: `${__dirname}/components/modals`,
        predefinedMessagesDir: `${__dirname}/messages`,
        selectMenusDir: `${__dirname}/components/selectMenus`,
        triggersDir: `${__dirname}/triggers`,
        removedIntents: [
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.MessageContent,
        ]
    },
)

for (const status of Database.prepare('SELECT * from statuses').all())
    mainClient.Statuses.set(status.id, { type: status.type, name: status.text });

mainClient.setBranding(JSON.parse(cfgs.brand));

const client = Object.assign(
    mainClient,
    {
        /** @type {import('fuse.js').default} */
        Fuse,
        Database,
        BCTIndex: Fuse.createIndex(
            ['name', 'value'],
            Database.prepare('SELECT barcodeKey AS value, barcodeName AS name FROM barcodes').all()
        ),
        developer: {
            get: async () => {
                return Promise.all(
                    Database.prepare('SELECT * FROM users').all()
                        .filter(usr => usr.flags.startsWith('1:'))
                        .map(usr => mainClient.users.fetch(usr.userid, { cache: true, force: true }))
                )
            },
            add: () => {
                Database.prepare('INSERT INTO users (userid, flags) VALUES (?, ?)').run('0', '1:0:0');
            },
            remove: (id) => {
                Database.prepare('DELETE FROM users WHERE userid = ?').run(id);
            },
        }

    }
);

const cron = new CronJob(
    '0 */5 * * * *',
    async () => {
        await fetch("https://uptime.betterstack.com/api/v1/heartbeat/GVDk6gBXr7rkxDYjUSLGgAY4")
    },
    null,
    true,
    'America/New_York',
    null,
    true
);

cron.start();
client.start();

module.exports = client;
