const { CommandContext, ClientEmbed } = require("../../");

module.exports = class MessageEvent {
    constructor(client) {
        this.client = client
        this.name = 'message'
    }

    ON(message, { channel, guild, author, client } = message) {
        const PREFIX = [this.client.prefix, `<@${this.client.user.id}>`, `<@!${this.client.user.id}>`];
        const verifyPrefix = PREFIX.find(prefix => message.content.startsWith(prefix));

        if (typeof verifyPrefix === 'string' && (message.content.length > verifyPrefix.length)) {
            const args = message.content.slice(verifyPrefix.length).trim().split(/ +/g);
            const cmdInsert = args.shift();
            const command = this.client.commands.all.find(cmd => (
                cmd.commandHelp.name.toLowerCase() === cmdInsert.toLowerCase()
            ) || (
                    cmd.commandHelp.aliases && cmd.commandHelp.aliases.includes(cmdInsert.toLowerCase())
                )
            )

            if (command) {
                const context = new CommandContext({
                    client: this.client,
                    command,
                    message,
                    args,
                });

                return command.commandHelp._run(command, context);
            }
        }

        const embed = new ClientEmbed(author);

        if (message.content.startsWith("<@595038256790372424>")) {

            channel.send(embed
                .setTitle(`<:contact:541103563217174539> - **${message.author.username}**, Central de **AJUDA**`)
                .setDescription(`${message.author}, está precisando de ajuda para saber quais **COMANDOS** eu tenho?

                <:question:596125631293685791> - É simples, ultilize o comando: **a.help** e lá você poderá ver a lista de todos os meus **COMANDOS**, muito interessante não acha?`)
                .setFooter(`💿 Aatron Music - 2019`, client.user.displayAvatarURL))   
        }
    }
}