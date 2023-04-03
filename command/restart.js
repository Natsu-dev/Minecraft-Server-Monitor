const util = require('minecraft-server-util');
const Discord = require('discord.js');
const {exec} = require('child_process');
require('date-utils');

module.exports = {
    name: 'restart',
    description: 'restart the server',
    async execute(client, command, args, message) {
        // TODO
        // 定期実行コマンドの停止
        // サーバー再起動処理
        exec('../restart.sh', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        })
        // 定期実行コマンドの再開
    }
}
