module.exports ={
    name: 'presenceUpdate',
    once: false,
    async execute(client, oldPresence, newPresence) {
        if (newPresence.userId == '530748350119673896' && newPresence.status == 'offline' || newPresence.status == 'invisible') {
            const channel = await client.channels.fetch('1040327100181270679');
            await channel.send('Alex has finally fallen asleep.');
        }
    }
}