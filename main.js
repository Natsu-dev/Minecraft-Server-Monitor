const Discord = require('discord.js');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Discord.Collection();
const prefix = 'mc:';
const fs = require('fs');
const path = require('path');
const util = require('minecraft-server-util');
const cron = require('node-cron');

// 環境変数に.envを使う
require('dotenv').config({path: path.join(__dirname, '.env')});

// コマンド読み込み
let command_count = 0;
const commandFiles = fs.readdirSync('./command').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    command_count++;
    const command = require(`./command/${file}`);
    console.log(command);
    client.commands.set(command.name, command);
}
console.log(`${command_count} files loaded.`)

// 定期実行の設定
setInterval(function () {
    util.status('192.168.1.5') // port is default 25565
        .then((response) => {
            console.log(response);
            let onlines = response.onlinePlayers;
            client.user.setActivity({name: onlines + ' 人がMinecraft'}); //ステータスメッセージ
        })
        .catch((error) => {
            console.error(error);
        });
}, 10000)

// 定時実行の設定
cron.schedule('0 0 22 * * *', () => {

}, {
    scheduled: true,
    timezone: 'Asia/Tokyo'
})

// ログイン処理
client.on('ready', () => {
    client.user.setStatus('online'); //online, idle, dnd, invisible
    client.user.setActivity('t:info'); //ステータスメッセージ

    console.log(`USER: ${client.user.username}`)
    console.log(`ID: ${client.user.id}`)
    console.log(`SERVERS:`)
    client.guilds.cache.forEach(guild =>
        console.log(`    ${guild.name}`)
    );

    console.log('ready...');
});

// コマンド処理
client.on('messageCreate', async message => {

    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
    const command = args.shift().toLowerCase(); //引数
    console.log(command)
    // -> command.js
    await client.commands.get('command').execute(client, command, args, message);

});

client.login(process.env.DISCORD_TOKEN) // Login phase
    .then(r => console.log('Login success.'))
    .catch(console.error);
