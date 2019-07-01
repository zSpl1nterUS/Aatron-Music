const { Command, ClientEmbed } = require("../../");

module.exports = class Jump extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            aliases: ['help', 'ajuda']
        })
    }

    async run({ message, args, guild, author, channel }) {

        const embed = new ClientEmbed(author);

        channel.send(embed
            .setTitle(`<:contact:541103563217174539> - **${message.author.username}**, Bem-Vindo á minha central de **AJUDA**!`)
            .setDescription(`<:information:537072191292964865> - Aqui você encontra a lista de todos os meus **COMANDOS**, caso queira saber mais de algum em específico, dê: \`a.help <comando>\`!

            <a:music:512400492836683791> - Meus comandos de **MÚSICA** atualmente são:\n\n**play** - **stop** - **skip** - **clear** - **jump** - **loop** - **np** - **queue** - **remove** - **reset** - **search** - **volume**`)
            .setTimestamp()
            .setFooter(`Aatron Music - 2019`, message.client.user.avatarURL))
        
    }
}