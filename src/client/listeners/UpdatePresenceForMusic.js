module.exports = class MessageEvent {
    constructor(client) {
        this.client = client
        this.name = 'updatePresenceForMusic'
    }

    async ON() {
        const status = (this.client.music.module.queue.get(process.env.guildID) && this.client.music.module.queue.get(process.env.guildID).songPlaying
            ? `Tocando Agora: ${this.client.music.module.queue.get(process.env.guildID).songPlaying.name}`
            : 'No momento não á nada tocando'
        )
        return this.client.user.setPresence({
            activity: {
                name: status
            },
            status: 'dnd'
        })
    }
}