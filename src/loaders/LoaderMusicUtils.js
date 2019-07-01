const YouTube = require('simple-youtube-api');

module.exports = class MusicUtils {
    constructor(client) {
        this.client = client
        this.name = 'LoaderMusicUtils'
        this.music = {
            module: false,
            utils: this,
            api: false
        }
    }

    async call() {
        this.client.music = this.music;
        this.loaderModule();
        return this.loaderUtils()
            .then(() => this.client.LOG('LoaderMusicUtils was loaded!', this.name))
    }

    async loaderUtils(err = false) {
        try {
            this.music.api = new YouTube(process.env.YOUTUBE_API_KEY);
        } catch (e) {
            this.client.LOG_ERR(e, this.name)
            err = true
        } finally {
            if (err) this.music.api = false;
        }
        return true;
    }

    loaderModule() {
        const module = new (require("../music/MusicPlayer.js"))(this.client);
        this.music.module = module;
        module.loadUtils();
    }
}