const { Command, ClientEmbed } = require("../../");

module.exports = class Skip extends Command {
    constructor(client) {
        super(client, {
            name: 'skip',
            aliases: ['sk']
        })
    }

    async run({ voiceChannel, message, channel, guild, author }) {
        const trueResult = await this.verifyVoice(guild, channel, author, voiceChannel);
        if (trueResult) {
            const embed = new ClientEmbed(author);
            const guildQueue = await this.client.music.module.queue.get(guild.id);
            if (guildQueue && guildQueue.songs.length) {
                return message.react('⏩').then(() => guildQueue.skip());
            } else {
                if (guildQueue) {
                    return channel.send(embed
                        .setTitle('<:error:538505640889417752> - Não há nenhuma música depois dessa!')
                        .setTimestamp()
                        .setColor(process.env.ERR_COLOR)
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