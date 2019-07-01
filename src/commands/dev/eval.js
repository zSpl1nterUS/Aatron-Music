const { Command, ClientEmbed } = require("../../");
const util = require("util");

module.exports = class Eval extends Command {
    constructor(client) {
        super(client, {
            name: 'eval',
            aliases: ['e']
        })
    }

    async run({ channel, message, guild, author, args }) {
        let insert = args.join(' ');
        try {
            const evaled = await eval(insert.replace(/(^`{3}(\w+)?|`{3}$)/g, ''))
            const cleanEvaled = this.clean(util.inspect(evaled, { depth: 0 }))
            await channel.send(cleanEvaled, { code: 'js' }).catch(() => { })
        } catch (err) {
            channel.send('```xl\n' + this.clean(err) + '\n```').catch(() => { })
        }
    }

    clean(text) {
        const blankSpace = String.fromCharCode(8203)
        return typeof text === 'string' ? text.replace(/`/g, '`' + blankSpace).replace(/@/g, '@' + blankSpace) : text
    }
}