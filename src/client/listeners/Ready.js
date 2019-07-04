module.exports = class MessageEvent {
    constructor(client) {
        this.client = client
        this.name = 'ready'
    }

    async ON() {
        return this.client.user.setPresence({
            activity: {
                name: 'Ainda estou em fase Beta!',
                name: 'O que acha de me convidar para seu servidor?',
                name: 'Fui criado com o intuito de levar música a todos os servidores',
                name: 'Sabia que sou Open-Source? Use o comando: a.botinfo'
            },
            status: 'idle',
            status: 'online',
            status: 'streaming',
            status: "online"
        })
    }
}