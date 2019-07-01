const ClientEmbed = require("../ClientEmbed.js");

module.exports = class Command {
    constructor(client, options) {
        this.client = client
        this.name = options.name || 'Nenhum'
        this.aliases = options.aliases || []
    }

    async _run(command, context, { author, channel } = context) {
        try {
            await command.commandHelp.run(context);
        } catch (e) {
            this.client.LOG_ERR(e, 'RunCommand', command.commandHelp.name)
            return channel.send(new ClientEmbed(author)
                .setTitle('Ocorreu um erro ao executar o comando!')
                .setDescription(e.message)
                .setColor(process.env.ERR_COLOR)
            )
        }
    }

    verifyVoice(guild, channel, author, voiceChannel) {
        const embed = new ClientEmbed(author);
        const guildQueue = this.client.music.module.queue.get(guild.id);

        if (!voiceChannel) {
            let response = 'Por favor conecte-se a um canal de voz!'
            if (guildQueue) response = 'Por favor conecte-se ao canal de voz que eu estou!'
            channel.send(embed
                .setTitle(response)
                .setColor(process.env.ERR_COLOR)
            )
            return false;
        } else if (guildQueue) {
            if (guildQueue.voiceChannel.id !== voiceChannel.id) {
                channel.send(embed
                    .setTitle('Por favor conecte-se ao canal de voz que eu estou!')
                    .setColor(process.env.ERR_COLOR)
                )
                return false;
            }
        }
        return true;
    }
}