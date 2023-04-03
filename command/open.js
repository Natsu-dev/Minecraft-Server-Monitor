const util = require('minecraft-server-util');
const Discord = require('discord.js');
const {exec} = require('child_process');
require('date-utils');

module.exports = {
    name: 'open',
    description: 'open the server',
    async execute(client, command, args, message) {
        // TODO
        // サーバー起動
        exec('bash ' + process.cwd() + '/open.sh', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        })
        // 定期実行のサーバ監視を開始
        // 定期実行コマンドの開始
    }
}
