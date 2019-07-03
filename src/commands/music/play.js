const { Command, ClientEmbed } = require("../../");
const { Util } = require("discord.js");

module.exports = class Play extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            aliases: ['tocar', 'p']
        })
    }

    async run({ voiceChannel, channel, guild, author, args, message }) {
        const trueResult = await this.verifyVoice(guild, channel, author, voiceChannel);
        if (trueResult) {
            const paramUrl = /(?:www\.)?(?:youtu\.be|youtube\.com)/;
            const search = args.slice(0).join(' ');
            const embed = new ClientEmbed(author);

            let at = message.author

            if (search) {
                let result = false;
                if (search.match(paramUrl)) {
                    const url = args.find(m => m.match(paramUrl));
                    result = await this.client.music.utils.getUrlSong(url);
                } else {
                    result = await this.client.music.utils.getSongByTitle(Util.escapeMarkdown(search));
                }

                if (Array.isArray(result) && result.length) {
                    let queueBreak = this.client.music.module.queue.get(guild.id);
                    try {
                        this.client.music.module.play(result, guild, voiceChannel, author);
                        let guildQueue = this.client.music.module.queue.get(guild.id);
                        if (!queueBreak) this.responseMusic(guildQueue, channel);
                    } catch (err) {
                        return channel.send(embed
                            .setTitle('<:error:538505640889417752> - Erro encontrado')
                            .setDescription(err.message)
                            .setFooter(`💿 Aatron Music - 2019`, message.client.user.displayAvatarURL)
                            .setColor(process.env.ERR_COLOR)
                        )
                    }
                } else {
                    return channel.send(embed
                        .setTitle('<:error:538505640889417752> - Erro encontrado no comando!')
                        .setDescription(`${at}, não consegui encontrar nenhum **resultado** para música desejada, verifique o **NOME** ou o **LINK** e tente novamente!`)
                        .setFooter(`💿 Aatron Music - 2019`, message.client.user.displayAvatarURL)
                        .setColor(process.env.ERR_COLOR)
                    )
                }
            } else {
                return channel.send(embed
                    .setTitle('<:error:538505640889417752> - Erro encontrado!')
                    .setDescription(`${at}, você deve inserir o **NOME** ou **LINK** desejado \`(YouTube)\``)
                    .setFooter(`💿 Aatron Music - 2019`, message.client.user.displayAvatarURL)
                    .setColor(process.env.ERR_COLOR)
                )
            }
        }
    }

    responseMusic(queue, channel) {
        const send = async (e) => { return channel.send(e) };
        const embed = (u, d, c) => {
            const e = new ClientEmbed(u).setDescription(d);
            return c ? e.setColor(process.env.ERR_COLOR) : e;
        }

        queue.on('stop', (u, l) => l || send(embed(u, '<:okay:538503952900161538> - A **lista** de reprodução acabou', true)));
        queue.on('start', (s) => send(embed(s.addedBy, `<a:music:512400492836683791> - Começando a **tocar**: **[${s.name}](${s.url})** \`[${s.durationContent}]\``)).then((m) => queue.setLastMesage(m)));
        queue.on('error', (s) => send(embed(s.addedBy, `<:error:538505640889417752> - Ocorreu um erro ao tentar reproduzir a música: **[${s.name}](${s.url})**`, true)));
        queue.on('queue', (s, u) => {
            if (s.length > 1) send(embed(u, `<:playl:538536887502110730> - Adicionei **${s.length}** **MÚSICAS** na queue!`));
            else {
                send(embed(u, `<:playl:538536887502110730> - Adicione a **MÚSICA**: **[${s[0].name}](${s[0].url})** na queue!`)).then(m => m.delete({ timeout: 20000 }));
            }
        })
    }
}