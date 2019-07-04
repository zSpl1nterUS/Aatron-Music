const { Command, ClientEmbed } = require("../../");

module.exports = class Help extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            aliases: ['help', 'ajuda']
        })
    }

    async run({ message, args, guild, author, channel }) {

        const embed = new ClientEmbed(author);

        if (args[0] == 'play') {

            channel.send(embed
                .addField(`<:listening:538543117373014016> - **\`a.play\`**`, "Ultilize este comando para tocar músicas em seu servidor!")
                .addField("<:wrench:537016278452404254> - Como usar:", `**a.play <Nome da Música>**`)
                .addField("<:openb:538537329216847872> - Exemplos:", `\`a.play Neffex ComeBack\``)
                .addField("<:shuffle:537011775879774226> - Alternativas:", `\`a.play, a.p, a.tocar\``)
                .setThumbnail('https://cdn.discordapp.com/attachments/592870348547031056/596129710350663681/gifs-animados-notas-musicales-2777159.gif')
                .setFooter("💿 Música", message.client.user.displayAvatarURL))
            return;
        }

        if (args[0] == 'stop') {

            channel.send(embed
                .addField(`<:listening:538543117373014016> - **\`a.play\`**`, "Ultilize este comando para sua lista de reprodução!")
                .addField("<:wrench:537016278452404254> - Como usar:", `**a.stop**`)
                .addField("<:openb:538537329216847872> - Exemplos:", `\`a.stop\``)
                .addField("<:shuffle:537011775879774226> - Alternativas:", `\`a.stop, a.parar\``)
                .setThumbnail('https://cdn.discordapp.com/attachments/592870348547031056/596129710350663681/gifs-animados-notas-musicales-2777159.gif')
                .setFooter("💿 Música", message.client.user.displayAvatarURL))
            return;
        }

        if (args[0] == 'stop') {

            channel.send(embed
                .addField(`<:listening:538543117373014016> - **\`a.skip\`**`, "Ultilize este comando para pular alguma música na lista de reprodução!")
                .addField("<:wrench:537016278452404254> - Como usar:", `**a.skip**`)
                .addField("<:openb:538537329216847872> - Exemplos:", `\`a.skip\``)
                .addField("<:shuffle:537011775879774226> - Alternativas:", `\`a.skip, a.pular, a.sk\``)
                .setThumbnail('https://cdn.discordapp.com/attachments/592870348547031056/596129710350663681/gifs-animados-notas-musicales-2777159.gif')
                .setFooter("💿 Música", message.client.user.displayAvatarURL))
            return;
        }

        if (args[0] == 'stop') {

            channel.send(embed
                .addField(`<:listening:538543117373014016> - **\`a.limpar\`**`, "Ultilize este comando para limpar sua lista de reprodução!")
                .addField("<:wrench:537016278452404254> - Como usar:", `**a.clear**`)
                .addField("<:openb:538537329216847872> - Exemplos:", `\`a.clear\``)
                .addField("<:shuffle:537011775879774226> - Alternativas:", `\`a.clear, a.limpar\``)
                .setThumbnail('https://cdn.discordapp.com/attachments/592870348547031056/596129710350663681/gifs-animados-notas-musicales-2777159.gif')
                .setFooter("💿 Música", message.client.user.displayAvatarURL))
            return;
        }
        
        if (args[0] == 'jump') {

            channel.send(embed
                .addField(`<:listening:538543117373014016> - **\`a.jump\`**`, "Ultilize este comando para pular o número desejado de músicas!")
                .addField("<:wrench:537016278452404254> - Como usar:", `**a.jump <quantidade>**`)
                .addField("<:openb:538537329216847872> - Exemplos:", `\`a.jump 3\``)
                .addField("<:shuffle:537011775879774226> - Alternativas:", `\`a.jump, a.pular, a.jm\``)
                .setThumbnail('https://cdn.discordapp.com/attachments/592870348547031056/596129710350663681/gifs-animados-notas-musicales-2777159.gif')
                .setFooter("💿 Música", message.client.user.displayAvatarURL))
            return;
        }

        if (args[0] == 'loop') {

            channel.send(embed
                .addField(`<:listening:538543117373014016> - **\`a.loop\`**`, "Ultilize este comando para ativar a repetição da lista de reprodução!")
                .addField("<:wrench:537016278452404254> - Como usar:", `**a.loop**`)
                .addField("<:openb:538537329216847872> - Exemplos:", `\`a.loop\``)
                .addField("<:shuffle:537011775879774226> - Alternativas:", `\`a.loop, a.repetir\``)
                .setThumbnail('https://cdn.discordapp.com/attachments/592870348547031056/596129710350663681/gifs-animados-notas-musicales-2777159.gif')
                .setFooter("💿 Música", message.client.user.displayAvatarURL))
            return;
        }
        
        if (args[0] == 'np') {

            channel.send(embed
                .addField(`<:listening:538543117373014016> - **\`a.np\`**`, "Ultilize este comando para saber as informações da música que está tocando no momento!")
                .addField("<:wrench:537016278452404254> - Como usar:", `**a.np**`)
                .addField("<:openb:538537329216847872> - Exemplos:", `\`a.np\``)
                .addField("<:shuffle:537011775879774226> - Alternativas:", `\`a.np, a.tocand\``)
                .setThumbnail('https://cdn.discordapp.com/attachments/592870348547031056/596129710350663681/gifs-animados-notas-musicales-2777159.gif')
                .setFooter("💿 Música", message.client.user.displayAvatarURL))
            return;
        }
        
        if (args[0] == 'queue') {

            channel.send(embed
                .addField(`<:listening:538543117373014016> - **\`a.queue\`**`, "Ultilize este comando para saber as informações da lista de reprodução!")
                .addField("<:wrench:537016278452404254> - Como usar:", `**a.queue**`)
                .addField("<:openb:538537329216847872> - Exemplos:", `\`a.queue\``)
                .addField("<:shuffle:537011775879774226> - Alternativas:", `\`a.queue, a.lista\``)
                .setThumbnail('https://cdn.discordapp.com/attachments/592870348547031056/596129710350663681/gifs-animados-notas-musicales-2777159.gif')
                .setFooter("💿 Música", message.client.user.displayAvatarURL))
            return;
        }
        
        if (args[0] == 'remove') {

            channel.send(embed
                .addField(`<:listening:538543117373014016> - **\`a.remove\`**`, "Ultilize este comando para remover alguma música da lista de reprodução!")
                .addField("<:wrench:537016278452404254> - Como usar:", `**a.remove <número da música>**`)
                .addField("<:openb:538537329216847872> - Exemplos:", `\`a.remove 32\``)
                .addField("<:shuffle:537011775879774226> - Alternativas:", `\`a.remove, a.remover, a.tirar\``)
                .setThumbnail('https://cdn.discordapp.com/attachments/592870348547031056/596129710350663681/gifs-animados-notas-musicales-2777159.gif')
                .setFooter("💿 Música", message.client.user.displayAvatarURL))
            return;
        }

        if (args[0] == 'reset') {

            channel.send(embed
                .addField(`<:listening:538543117373014016> - **\`a.reset\`**`, "Ultilize este comando para recomeçar a lista de reprodução!!")
                .addField("<:wrench:537016278452404254> - Como usar:", `**a.reset**`)
                .addField("<:openb:538537329216847872> - Exemplos:", `\`a.reset\``)
                .addField("<:shuffle:537011775879774226> - Alternativas:", `\`a.reset, a.resetar, a.recomeçar\``)
                .setThumbnail('https://cdn.discordapp.com/attachments/592870348547031056/596129710350663681/gifs-animados-notas-musicales-2777159.gif')
                .setFooter("💿 Música", message.client.user.displayAvatarURL))
            return;
        }
        
        if (args[0] == 'search') {

            channel.send(embed
                .addField(`<:listening:538543117373014016> - **\`a.search\`**`, "Ultilize este comando para procurar alguma música e adiciona-lá á lista de reprodução!")
                .addField("<:wrench:537016278452404254> - Como usar:", `**a.search <Nome da música>**`)
                .addField("<:openb:538537329216847872> - Exemplos:", `\`a.search Neffex ComeBack\``)
                .addField("<:shuffle:537011775879774226> - Alternativas:", `\`a.search, a.procurar\``)
                .setThumbnail('https://cdn.discordapp.com/attachments/592870348547031056/596129710350663681/gifs-animados-notas-musicales-2777159.gif')
                .setFooter("💿 Música", message.client.user.displayAvatarURL))
            return;
        }
        
        if (args[0] == 'volume') {

            channel.send(embed
                .addField(`<:listening:538543117373014016> - **\`a.volume\`**`, "Ultilize este comando para alterar o volume da música!")
                .addField("<:wrench:537016278452404254> - Como usar:", `**a.volume <número>**`)
                .addField("<:openb:538537329216847872> - Exemplos:", `\`a.volume 160\``)
                .addField("<:shuffle:537011775879774226> - Alternativas:", `\`a.volume, a.vol\``)
                .setThumbnail('https://cdn.discordapp.com/attachments/592870348547031056/596129710350663681/gifs-animados-notas-musicales-2777159.gif')
                .setFooter("💿 Música", message.client.user.displayAvatarURL))
            return;
        }
        channel.send(embed
            .setTitle(`<:contact:541103563217174539> - **${message.author.username}**, Bem-Vindo á minha central de **AJUDA**!`)
            .setDescription(`<:information:537072191292964865> - Aqui você encontra a lista de todos os meus **COMANDOS**, caso queira saber mais de algum em específico, dê: \`a.help <comando>\`!

            <a:music:512400492836683791> - Meus comandos de **MÚSICA** atualmente são:\n\n**play** - **stop** - **skip** - **clear** - **jump** - **loop** - **np** - **queue** - **remove** - **reset** - **search** - **volume**`)
            .setFooter(`💿 Aatron Music - 2019`, message.client.user.displayAvatarURL))


    }
}