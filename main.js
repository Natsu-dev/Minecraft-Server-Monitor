const Discord = require('discord.js');
const client = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]});
client.commands = new Discord.Collection();
const prefix = 'mc:';
const fs = require('fs');
const path = require('path');
const util = require('minecraft-server-util');

// 環境変数に.envを使う
require('dotenv').config({path: path.join(__dirname, '.env')});

// 定期実行の周期(ms)
const timeoutInterval = 30000;
// 自動シャットダウンまでの時間(ms)
const autoShutdownTime = 3600000;
let onlines = '-';
let zeroPlayersCount = 0;

// コマンド読み込み
let commandNum = 0;
const commandFiles = fs.readdirSync('./command').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    commandNum++;
    const command = require(`./command/${file}`);
    console.log(command);
    client.commands.set(command.name, command);
}
console.log(`${commandNum} files loaded.`)

// 定期実行の設定
setInterval(() => {
    util.status(process.env.IP_ADDRESS, Number(process.env.PORT) ?? 25565) // port is default 25565
        .then((response) => {
            console.log(response);
            onlines = response.players.online;
            client.user.setPresence({
                activities: [{
                    name: `${response.players.online} 人がMinecraft`,
                    type: 'PLAYING'
                }],
                status: 'online'
            })

            // 人数が0の場合はカウントを追加，そうでなければカウントを0に戻す
            if (onlines === 0)
                zeroPlayersCount++;
            else
                zeroPlayersCount = 0;

            // 0人のままautoShutdownTimeを過ぎた場合は電源を切る
            // if (zeroPlayersCount >= autoShutdownTime / timeoutInterval) {
            //     exec('systemctl poweroff', (error, stdout, stderr) => {
            //         if (error) {
            //             console.error(`exec error: ${error}`);
            //             return;
            //         }
            //         console.log(`stdout: ${stdout}`);
            //         console.error(`stderr: ${stderr}`);
            //     })
            // }
            console.log(`zeroPlayersCount: ${zeroPlayersCount}`);
        })
        .catch((error) => {
            console.error(error);

            client.user.setPresence({
                activities: [],
                status: 'idle'
            })
        });
}, timeoutInterval)

// ログイン処理
client.on('ready', () => {
    client.user.setStatus('idle'); //online, idle, dnd, invisible

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
        .trim() // 前後の空白や改行等を取る
        .split(/ +/g);
    const command = args.shift().toLowerCase(); //引数
    console.log(command)
    // -> command.js
    await client.commands.get('command').execute(client, command, args, message);

});

client.login(process.env.DISCORD_TOKEN) // Login phase
    .then(r => console.log('Login success.'))
    .catch(console.error);
