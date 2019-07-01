const { CommandContext } = require("../../");

module.exports = class MessageEvent {
    constructor(client) {
        this.client = client
        this.name = 'message'
    }

    ON(message, { channel, guild, author } = message) {
        if ((!author.bot && guild) && channel.permissionsFor(this.client.user).has('SEND_MESSAGES')) {
            const PREFIX = [this.client.prefix, `<@${this.client.user.id}>`, `<@!${this.client.user.id}>`];
            const verifyPrefix = PREFIX.find(prefix => message.content.startsWith(prefix));

            if (typeof verifyPrefix === 'string' && (message.content.length > verifyPrefix.length)) {
                if (this.client.managers.includes(author.id)) {
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
            }
        }
    }
}