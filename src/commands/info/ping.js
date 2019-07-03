const { Command, ClientEmbed } = require("../..");

module.exports = class Ping extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            aliases: ['ping', 'latencia']
        })
    }

    async run({ message, author, channel, client }) {

        const embed = new ClientEmbed(author);

        channel.send(embed
            .setTitle(`<:contact:541103563217174539> - **${message.author.username}**, Bem-Vido á minha central de **CONEXÃO**!`)
            .setDescription(`<:hosting:537349770591731712> - Aqui você vai encontrar as informações de minhas **CONEXÕES**, como por exemplo meu **PING**, a **SHARD** que está sendo utlilizada em seu servidor, etc...!

            <:ccloud:537349883242479616> - **Ping**: \`${parseInt(new Date() - message.createdTimestamp)}\`
            <:ccloud:537349883242479616> - **Latência:** \`${Math.round(this.client.ping)}\`
            <:ccloud:537349883242479616> - **Shard:** \`${(this.client.shard.id + 1)}/${(this.client.shard.count)}\`
        
            <a:spinner:540302486376808479> - Estou com muito **LAG** na hora de tocar **MÚSICA**? Por favor entre em contato com meu **Desenvolvedor:** \`zSpl1nterUS_#1320\``)
            .setFooter(`💿 Aatron Music - 2019`, message.client.user.displayAvatarURL))

            console.log(this.client.shard)
    }
}