module.exports = {
    name: 'wol',
    description: 'wol',
    async execute(client, command, args, message) {
        message.channel.send('Wol');
    }
}