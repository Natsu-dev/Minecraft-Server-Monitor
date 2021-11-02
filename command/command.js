module.exports = {
    name: 'command',
    description: 'command hub',
    async execute(client, command, args, message){
        if (command === 'test' || command === 't'){
            message.channel.send('test');
        }
        if (command === 'wol' || command === 'w'){
            console.log('command: wol');
            await client.commands.get('wol').execute(client, command, args, message);
        }
    }
}
