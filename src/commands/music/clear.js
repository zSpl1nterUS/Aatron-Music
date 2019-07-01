const { Command, ClientEmbed } = require("../../");

module.exports = class Clear extends Command {
    constructor(client) {
        super(client, {
            name: 'clear',
            aliases: []
        })
    }

    async run({ channel, guild, author, message }) {
        const trueResult = await this.verifyVoice(guild, channel, author, voiceChannel);
        if (trueResult) {
            const embed = new ClientEmbed(author);
            const guildQueue = await this.client.music.module.queue.get(guild.id);
            if (guildQueue && guildQueue.songs.length) {
                return channel.send(embed
                    .setTitle('Queue limpa com sucesso!')
                ).then(() => guildQueue.clearQueue());
            } else {
                if (guildQueue) {
                    return channel.send(embed
                        .setTitle('Não há nehuma música depois da atual!')
                        .setColor(process.env.ERR_COLOR)
                    )
                } else {
                    return channel.send(embed
                        .setTitle('Não estou tocando nada no **momento**')
                        .setColor(process.env.ERR_COLOR)
                    )
                }
            }
        }
    }
}