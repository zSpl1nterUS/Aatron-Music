const { Command, ClientEmbed } = require("../../");

module.exports = class Loop extends Command {
    constructor(client) {
        super(client, {
            name: 'loop',
            aliases: ['repetir']
        })
    }

    async run({ voiceChannel, channel, guild, author, message }) {
        const trueResult = await this.verifyVoice(guild, channel, author, voiceChannel);
        if (trueResult) {
            const embed = new ClientEmbed(author);
            const guildQueue = await this.client.music.module.queue.get(guild.id);
            if (guildQueue) {
                let loopActive = guildQueue.loop ? false : true;
                return channel.send(embed
                    .setTitle(loopActive ? '<:okay:538503952900161538> - Auto repetição da queue **ligada**!' : '<:okay:538503952900161538> - Auto repetição da queue **desligada**')
                ).then(() => guildQueue.queueLoop(loopActive))
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