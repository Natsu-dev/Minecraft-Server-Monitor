const util = require('minecraft-server-util');
const Discord = require('discord.js');
require('date-utils')

module.exports = {
    name: 'status',
    description: 'show server status',
    async execute(client, command, args, message) {
        util.status(process.env.IP_ADDRESS) // port is default 25565
            .then((response) => {
                console.log(response);
                return new Promise((resolve) => {
                    // Embedの初期化
                    let embed = new Discord.MessageEmbed()
                        .setTitle(response.motd.clean + ' のサーバー情報')
                        .setColor('0x3cb371')
                        .setDescription(new Date().toFormat('YYYY/MM/DD HH24:MI:SS'))
                        .setTimestamp()

                    // サーバーの情報を追加
                    embed.addField('Status: :blue_circle:', 'Active', false)
                    embed.addField('Version', response.version, false)

                    // プレイヤーの一覧をEmbedに追加
                    //let playerNameArray = [];
                    //for (let i in response.samplePlayers) {
                    //    playerNameArray.push(response.samplePlayers[i].name)
                    //}
                    embed.addField(
                        'Players',
                        response.onlinePlayers.toString() + ' / ' + response.maxPlayers.toString(),
                        // playerNameArray.join(', ')
                        false
                    )
                    resolve(embed);
                }).then((embed) => {
                    console.log(embed);
                    message.channel.send({embeds: [embed]});
                })

            })
            .catch((error) => {
                console.error(error)
                return new Promise((resolve) => {
                    let embed = new Discord.MessageEmbed()
                        .setTitle('Server Error')
                        .setColor('0xf08080')
                        .setDescription(new Date().toFormat('YYYY/MM/DD HH24:MI:SS'))
                        .setTimestamp()

                    embed.addField('Status: :red_circle:', 'Inactive', false)
                    embed.addField('Error Number', error.errno.toString(), false)
                    embed.addField('Code', error.code, false)
                    embed.addField('Syscall', error.syscall, false)

                    resolve(embed);
                }).then((embed) => {
                    message.channel.send({embeds: [embed]});
                })

            })
    }
}