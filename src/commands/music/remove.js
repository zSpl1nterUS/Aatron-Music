const { Command, ClientEmbed } = require("../../");

module.exports = class Remove extends Command {
    constructor(client) {
        super(client, {
            name: 'remove',
            aliases: ['tirar']
        })
    }

    async run({ voiceChannel, args, channel, guild, author, message }) {
        const trueResult = await this.verifyVoice(guild, channel, author, voiceChannel);
        if (trueResult) {
            const embed = new ClientEmbed(author);
            const guildQueue = await this.client.music.module.queue.get(guild.id);
            if (guildQueue && guildQueue.songs.length) {
                if (args[0]) {
                    let remove = Number(args[0]);
                    if (!(!isNaN(Number(args[0])))) return channel.send(embed
                        .setTitle(`<:error:538505640889417752> - Insira um número de **1** á **${guildQueue.songs.length}**`)
                        .setColor(process.env.ERR_COLOR)
                        .setTimestamp()
                        .setFooter(`Aatron Music - 2019`, message.client.user.displayAvatarURL)
                    );
                    remove = Math.round(remove);
                    if (remove > guildQueue.songs.length || remove < 1) return channel.send(embed
                        .setTitle(`<:error:538505640889417752> - Insira um número de **1** á **${guildQueue.songs.length}**!`)
                        .setTimestamp()
                        .setFooter(`Aatron Music - 2019`, message.client.user.displayAvatarURL)
                        .setColor(process.env.ERR_COLOR)
                    );
                    let song = guildQueue.songs[remove - 1];
                    return channel.send(embed
                        .setDescription(`<:okay:538503952900161538> - Removi a música **[${song.name}](${song.url})** da queue!`)
                        .setTimestamp()
                        .setFooter(`Aatron Music - 2019`, message.client.user.displayAvatarURL)
                    ).then(() => guildQueue.removeOne(remove));
                } else {
                    return channel.send(embed
                        .setTitle(`<:error:538505640889417752> - Insira um número de músicas para eu remover! **[1 á ${guildQueue.songs.length}]**`)
                        .setColor(process.env.ERR_COLOR)
                        .setTimestamp()
                        .setFooter(`Aatron Music - 2019`, message.client.user.displayAvatarURL)
                    )
                }
            } else {
                if (guildQueue) {
                    return channel.send(embed
                        .setTitle('<:error:538505640889417752> - Não há música depois da atual!')
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