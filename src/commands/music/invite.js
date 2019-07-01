const { Command, ClientEmbed } = require("../../");

module.exports = class Jump extends Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            aliases: ['invite', 'convite']
        })
    }

    async run({ message, args, guild, author, channel }) {

        const embed = new ClientEmbed(author);

        channel.send(embed
            .setTitle(`<:contact:541103563217174539> - **${message.author.username}**, Bem-Vindo á minha central de **LINKS**!`)
            .setDescription(`<:resume:543956493746176000> - Aqui você encontra todos os meus **LINKS** desde meu **CONVITE** á meu servidor de **SUPORTE**, confira abaixo todos!\n\n***<:bot:543969729119780894> - [Meu Convite](https://discordapp.com/api/oauth2/authorize?client_id=595038256790372424&permissions=8&scope=bot)***\n\n<a:dc:516402655661129729> - ***[Servidor De Suporte]()*** \`(Desenvolvimento)\`\n\n<:monitor:543956399949086720> - ***[Site]()*** \`(Desenvolvimento)\``)
            .setTimestamp()
            .setFooter(`Aatron Music - 2019`, message.client.user.avatarURL))
        
    }
}