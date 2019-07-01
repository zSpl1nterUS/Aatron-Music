const { QueueMusic } = require("./listens");
const MusicUtils = require("./MusicUtils.js");

module.exports = class MusicPlayer extends MusicUtils {
    constructor(client) {
        super(client)
        this.client = client
        this.queue = new client.collection
    }

    async play(songs, guild, channel, addedBy) {
        let guildQueue = this.queue.get(guild.id);

        if (!guildQueue) {
            guildQueue = new (QueueMusic)(guild, channel, this.client);
            guildQueue.set();
        }

        if (guildQueue.songPlaying) {
            return guildQueue.pushSongs(songs, addedBy)
        } else {
            return this.player(guildQueue, songs, addedBy);
        }
    }

    async player(queue, songs, addedBy) {
        await queue.pushSongs(songs, addedBy);
        return queue.goPlay(0);
    }
}