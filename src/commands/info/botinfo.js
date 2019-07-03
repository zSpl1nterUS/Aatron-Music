const { Command, ClientEmbed } = require("../../");
const moment = require("moment")
require("moment-duration-format")
const os = require('os')
const cpuStat = require("cpu-stat");

module.exports = class BotInfo extends Command {
    constructor(client) {
        super(client, {
            name: 'botinfo',
            aliases: ['botinfo', 'b-info']
        })
    }

    async run({ message, client, author, channel }) {

        const embed = new ClientEmbed(author);

        let duration = moment.duration(client.uptime).format('D [d], H [h], m [m], s [s]');

        cpuStat.usagePercent(function(err, percent, seconds) {

        channel.send(embed
            .setTitle(`<:contact:541103563217174539> - **${message.author.username}**, Bem-Vindo á minha central das minhas **INFORMAÇÕES**!`)
            .setDescription(`<:bot:543969729119780894> - Aqui você vai encontrar o **TOTAL** de **MEMBROS**, **GUILDAS**, etc..., que tenho no momento, confira á baixo todas as minhas informações!
            
            <:alter:541054054474842113> - Meu Criador: **zSpl1nterUS_#1320**
            <:team:516020368729702431> - Usuários: **${client.users.size}**
            <:pcb:541054703002189825> - Servidores: **${client.guilds.size}**
            <:js:515652824013471779> - Linguagem em que fui desenvolvido: **Discord.JS**
            <a:uptime:512392551618183168> - Tempo Online: **${duration}**
            <:confetti:538797714780192800> - Emojis: **${client.emojis.size.toLocaleString()}**
            <:calendar:516018350665629715> - Data em que fui criado: **30/06/2019**
            <:postbox:512477373506256916> - Canais: **${client.channels.size}**
            <:settings:537012558289174529> - CPU usada: **${percent.toFixed(2)}%**
            <:ccloud:537349883242479616> - Ping: **${parseInt(new Date() - message.createdTimestamp)}**
            
            <a:dc:516402655661129729> - ***[Servidor de Suporte](https://discord.gg/kQE7t9v)***
            <:bot:543969729119780894> - ***[Meu Convite](https://discordapp.com/api/oauth2/authorize?client_id=595038256790372424&permissions=8&scope=bot)***
            <:github:596119383407853578> - ***[GitHub]()***
            <:monitor:543956399949086720> - ***[Site]()***\`(Desenvolvimento)\`
            
            Caso encontre algum **BUG** contate meu desenvolvedor!`)
            .setThumbnail(client.user.displayAvatarURL)
            .setFooter(`💿 Aatron Music - 2019`, client.user.displayAvatarURL))   
        })
    }
}