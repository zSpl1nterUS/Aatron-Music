const CommandUtils = require("./structures/CMD");

module.exports = {
    Command: CommandUtils.Command,
    CommandContext: CommandUtils.CommandContext,

    ClientEmbed: require("./structures/ClientEmbed.js")
}