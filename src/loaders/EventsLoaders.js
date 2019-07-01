const { readdirSync } = require("fs");

module.exports = class EventsLoader {
    constructor(client) {
        this.client = client
        this.name = 'EventsLoader'
    }

    call() {
        return this.loaderEvents()
            .then(() => this.client.LOG('I successfully carried all events!', this.name))
    }

    async loaderEvents(path = 'src/client/listeners') {
        const events = await readdirSync(path);
        return events.forEach((event) => {
            try {
                event = new (require(`../../${path}/${event}`))(this.client);
                this.client.on(event.name, (...args) => event.ON(...args));
            } catch (err) {
                this.client.LOG_ERR(err, this.name, event)
            }
        })
    }
}