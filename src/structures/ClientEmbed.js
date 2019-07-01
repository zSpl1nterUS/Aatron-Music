const { MessageEmbed } = require("discord.js");

module.exports = class ClientEmbed extends MessageEmbed {
    constructor(user, timestamp = true) {
        super({});
        this.setColor(process.env.COLOR_EMBED)
        if (timestamp) this.setTimestamp();
        if (user) this.setFooter(user.username, user.displayAvatarURL())
    }
}