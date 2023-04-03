const util = require('minecraft-server-util');
const Discord = require('discord.js');
const {exec} = require('child_process');
require('date-utils');

module.exports = {
    name: 'close',
    description: 'close the server',
    async execute(client, command, args, message) {
        // TODO
        // 定期実行コマンドを停止
        // 定期実行のサーバ監視を停止
        // サーバー終了
        exec('../close.sh', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        })
    }
}
