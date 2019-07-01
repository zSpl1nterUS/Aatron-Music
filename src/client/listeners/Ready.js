module.exports = class MessageEvent {
    constructor(client) {
        this.client = client
        this.name = 'ready'
    }

    async ON() {
        return this.client.user.setPresence({
            activity: {
                name: 'Sendo Desenvolvido!',
                name: 'Logo estarei pronto',
                name: 'Serei um bot zika!'
            },
            status: 'idle',
            status: 'online',
            status: 'streaming'
        })
    }
}