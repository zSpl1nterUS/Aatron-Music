const { Command, ClientEmbed } = require("../../");

module.exports = class Volume extends Command {
    constructor(client) {
        super(client, {
            name: 'volume',
            aliases: ['vol']
        })
    }

    async run({ voiceChannel, channel, args, guild, author, message }) {
        const trueResult = await this.verifyVoice(guild, channel, author, voiceChannel);
        if (trueResult) {
            const embed = new ClientEmbed(author);
            const guildQueue = await this.client.music.module.queue.get(guild.id);
            if (guildQueue && guildQueue.songPlaying) {
                if (args[0]) {
                    let vol = Number(args[0]);
                    if (!(!isNaN(Number(args[0])))) return channel.send(embed
                        .setTitle('<:error:538505640889417752> - Você deve inserir um número de **0** á **300**')
                        .setColor(process.env.ERR_COLOR)
                    );
                    vol = Math.round(vol);
                    if (vol > 300 || vol < 0) return channel.send(embed
                        .setTitle('<:error:538505640889417752> - Insira um número de **0** á **300**')
                        .setColor(process.env.ERR_COLOR)
                    );
                    return channel.send(embed
                        .setTitle(`<:okay:538503952900161538> - Volume alterado para: **${vol}**`)
                    ).then(() => guildQueue.volUpdate(vol));
                } else {
                    return channel.send(embed
                        .setTitle('<:error:538505640889417752> - Por favor insira o volume desejado! **[0 - 300]**')
                        .setColor(process.env.ERR_COLOR)
                    )
                }
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