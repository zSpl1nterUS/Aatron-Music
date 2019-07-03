const { Command, ClientEmbed } = require("../../");
const moment = require("moment")

moment.locale('pt-BR');

const getSong = (args, queue) => {
    args = Array.isArray(args) ? args.join(' ') : args;
    let type = 'name';
    let songs = queue.songs.concat([queue.songPlaying]);
    if (!isNaN(args)) type = 'number'
    else type = 'name';
    switch (type) {
        case 'name': {
            return songs.find(({ name }) => (name.toLowerCase() == args.toLowerCase()
                || name.toLowerCase().includes(args.toLowerCase()))
            )
        }
        case 'number': {
            return songs[(Number(args) - 1)]
        }
    }
}

module.exports = class SearchSong extends Command {
    constructor(client) {
        super(client, {
            name: 'search',
            aliases: ['searchsong']
        })
    }

    async run({ args, channel, guild, author, message }) {
        const embed = new ClientEmbed(author);
        const guildQueue = await this.client.music.module.queue.get(guild.id);
        if (guildQueue && guildQueue.songPlaying) {
            if (args[0]) {
                const song = await getSong(args, guildQueue);
                if (song) {
                    return channel.send(embed
                        .addField('<a:music:512400492836683791> - Nome da Música', `[${song.name}](${song.url})`)
                        .setFooter(`💿 Aatron Music - 2019`, message.client.user.displayAvatarURL)
                        .addField('🌀 - Adicionado Por', song.addedBy.toString(), true)
                        .addField('<:playl:538536887502110730> - Posição na Queue', ([guildQueue.songPlaying].indexOf(song) != -1
                            ? '**<a:music:512400492836683791> - Tocando Agora**'
                            : `**${(guildQueue.songs.indexOf(song) + 1)}°**`
                        ))
                        .addField('<:youtube:514806812143517725> - Canal Postado', `**${song.channelOwner}**`)
                        .addField('<:calendar:516018350665629715> - Data de Postagem', `**${moment(song.publishedAt).format('LLLL')}**`)
                        .setThumbnail(song.thumbnail.url)
                        .setFooter(`💿 Aatron Music - 2019`, message.client.user.displayAvatarURL)
                    )
                } else {
                    return channel.send(embed
                        .setTitle('<:error:538505640889417752> - Não consegui encontrar nenhuma **música** com este nome!')
                        .setFooter(`💿 Aatron Music - 2019`, message.client.user.displayAvatarURL)
                    )
                }
            } else {
                return channel.send(embed
                    .setTitle('<:error:538505640889417752> - Insira o **NOME** ou o **NÚMERO** da música que você deseja obter!')
                    .setFooter(`💿 Aatron Music - 2019`, message.client.user.displayAvatarURL)
                )
            }
        } else {
            return channel.send(embed
                .setTitle('<:error:538505640889417752> - No **momento** não estou tocando nada!')
                .setColor(process.env.ERR_COLOR)
                .setTimestamp()
                .setFooter(`💿 Aatron Music - 2019`, message.client.user.displayAvatarURL)
            )
        }
    }
}