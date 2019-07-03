const { Command, ClientEmbed } = require("../../");

module.exports = class Uptime extends Command {
    constructor(client) {
        super(client, {
            name: 'uptime',
            aliases: ['uptime', 'online']
        })
    }

    async run({ message, args, guild, author, channel, client }) {

        let u = convertMS(client.uptime);

        let segundo = u.s + " Segundos"
        let minuto = u.m + " Minutos"
        let hora = u.h + " Horas"
        let dia = u.d + " Dias"

        function convertMS(ms) {
            var d, h, m, s;
            s = Math.floor(ms / 1000);
            m = Math.floor(s / 60);
            s = s % 60;
            h = Math.floor(m / 60);
            m = m % 60;
            d = Math.floor(h / 24);
            h = h % 24;
            return {
                d: d
                , h: h
                , m: m
                , s: s
            };
        };

        const embed = new ClientEmbed(author);

        channel.send(embed
            .setTitle(`<:contact:541103563217174539> - **${message.author.username}**, Bem-Vido á minha central de **UPTIME**!`)
            .setDescription(`<:clock:595048298918838272> - Aqui você irá encontrar o tempo que estou **ONLINE** sem **desligar**/**reiniciar**, geralmente de **24H** em **24H** eu reinicio, então caso eu caia de seu canal de **MÚSICA** de repente já sabe o motivo, mas fique tranquilo sou **ligado** no mesmo **instante**!
            <a:uptime:512392551618183168> - Estou **Online** á: \n\`${dia}\n${hora}\n${minuto}\n${segundo}\``)
            .setFooter(`Aatron Music - 2019`, message.client.user.avatarURL))

    }
}