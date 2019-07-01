const { Command, ClientEmbed } = require("../../");

module.exports = class Jump extends Command {
    constructor(client) {
        super(client, {
            name: 'jump',
            aliases: ['jm', 'pular']
        })
    }

    async run({ voiceChannel, message, args, channel, guild, author }) {
        const trueResult = await this.verifyVoice(guild, channel, author, voiceChannel);
        if (trueResult) {
            const embed = new ClientEmbed(author);
            const guildQueue = await this.client.music.module.queue.get(guild.id);
            if (guildQueue && guildQueue.songs.length) {
                if (args[0]) {
                    let jump = Number(args[0]);
                    if (!(!isNaN(Number(args[0])))) return channel.send(embed
                        .setTitle(`<:error:538505640889417752> - Você deve inserir um número de **1** á** ${guildQueue.songs.length}**`)
                        .setColor(process.env.ERR_COLOR)
                        .setTimestamp()
                        .setFooter(`Aatron Music - 2019`, message.client.user.displayAvatarURL)
                    );
                    jump = Math.round(jump);
                    if (jump > guildQueue.songs.length || jump < 1) return channel.send(embed
                        .setTitle(`<:error:538505640889417752> - Você deve inserir um número de **1** á**${guildQueue.songs.length}**!`)
                        .setColor(process.env.ERR_COLOR)
                        .setTimestamp()
                        .setFooter(`Aatron Music - 2019`, message.client.user.displayAvatarURL)
                    );
                    return message.react('512392301037748251').then(() => guildQueue.jump(jump));
                } else {
                    return channel.send(embed
                        .setTitle(`<:error:538505640889417752> - Insira um número de músicas para eu pular: **[1 á ${guildQueue.songs.length}]**`)
                        .setColor(process.env.ERR_COLOR)
                        .setTimestamp()
                        .setFooter(`Aatron Music - 2019`, message.client.user.displayAvatarURL)
                    )
                }
            } else {
                if (guildQueue) {
                    return channel.send(embed
                        .setTitle('<:error:538505640889417752> - Não á outra música depois dessa!')
                        .setColor(process.env.ERR_COLOR)
                        .setTimestamp()
                        .setFooter(`Aatron Music - 2019`, message.client.user.displayAvatarURL)
                    )
                } else {
                    return channel.send(embed
                        .setTitle('<:error:538505640889417752> - No **momento** não estou tocando nada!')
                        .setColor(process.env.ERR_COLOR)
                        .setTimestamp()
                        .setFooter(`Aatron Music - 2019`, message.client.user.displayAvatarURL)
                    )
                }
            }
        }
    }
}