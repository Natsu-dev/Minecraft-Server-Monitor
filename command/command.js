module.exports = {
    name: 'command',
    description: 'command hub',
    async execute(client, command, args, message){
        if (command === 'test' || command === 't'){
            message.channel.send('test');
        }
        if (command === 'status' || command === 's'){
            console.log('command: status');
            await client.commands.get('status').execute(client, command, args, message);
        }
    }
}
