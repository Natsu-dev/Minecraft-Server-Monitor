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
        // if (command === 'open' || command === 'o'){
        //     console.log('command: open');
        //     await client.commands.get('open').execute(client, command, args, message);
        // }
        // if (command === 'restart' || command === 'r'){
        //     console.log('command: restart');
        //     await client.commands.get('restart').execute(client, command, args, message);
        // }
        // if (command === 'close' || command === 'c'){
        //     console.log('command: close');
        //     await client.commands.get('close').execute(client, command, args, message);
        // }
    }
}
