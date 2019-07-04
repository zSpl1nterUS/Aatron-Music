const { Command, ClientEmbed } = require("../../");

module.exports = class Reset extends Command {
    constructor(client) {
        super(client, {
            name: 'reset',
            aliases: ['resetar', 'recomeçar']
        })
    }

    async run({ voiceChannel, channel, guild, author, message }) {
        const trueResult = await this.verifyVoice(guild, channel, author, voiceChannel);
        if (trueResult) {
            const embed = new ClientEmbed(author);
            const guildQueue = await this.client.music.module.queue.get(guild.id);
            if (guildQueue && guildQueue.songPlaying) {
                return channel.send(embed
                    .setTitle('<:okay:538503952900161538> - Queue reseta com sucesso!')
                    .setFooter(`💿 Aatron Music - 2019`, message.client.user.displayAvatarURL)
                ).then(() => guildQueue.resetQueue())
            } else {
                return channel.send(embed
                    .setTitle('<:error:538505640889417752> - No **momento** não estou tocando nada!')
                    .setColor(process.env.ERR_COLOR)
                    .setFooter(`💿 Aatron Music - 2019`, message.client.user.displayAvatarURL)
                )
            }
        }
    }
}