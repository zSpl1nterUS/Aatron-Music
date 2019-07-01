const { Command, ClientEmbed } = require("../../");

module.exports = class Queue extends Command {
    constructor(client) {
        super(client, {
            name: 'queue',
            aliases: ['q', 'lista']
        })
    }

    async run({ channel, guild, author, message }) {
        const embed = new ClientEmbed(author);
        const guildQueue = await this.client.music.module.queue.get(guild.id);
        if (guildQueue && guildQueue.songPlaying) {
            return channel.send(embed
                .setTitle(`<:playl:538536887502110730> - Lista de Reprodução - **${guild.name}**`)
                .setTimestamp()
                .setFooter(`Aatron Music - 2019`, message.client.user.displayAvatarURL)
                .setDescription(
                    [`<:clock:595048298918838272> - Tempo estimado de Reprodução: **\`[${guildQueue.queueFullDuration}]\`**`,
                    `<:loop:595047906583511041> - Loop: **\`${guildQueue.loop ? 'Ativado' : 'Desativado'}\`**`,
                    `<a:music:512400492836683791> - Atual: **\`[${guildQueue.nowDuration}/${guildQueue.songPlaying.durationContent}]\`** - **[${guildQueue.songPlaying.name}](${guildQueue.songPlaying.url})**`,
                    '\n<:playl:538536887502110730> - Lista de Reprodução\n' + (!guildQueue.songs.length
                        ? '<:error:538505640889417752> - Nenhuma música após a atual.'
                        : guildQueue.songs.length <= 5
                            ? guildQueue.songs.map((s, n) => `\`${n + 1}.\` - **[${s.name}](${s.url})**, por **${s.addedBy.toString()}**`).join('\n')
                            : guildQueue.songs.map((s, n) => `\`${n + 1}.\` - **[${s.name}](${s.url})**, por **${s.addedBy.toString()}**`).slice(0, 5).join('\n')
                            + `\n<:more:595047495219019777> - E mais **${(guildQueue.songs.length - 5)}**...`
                    )].join('\n')
                )
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