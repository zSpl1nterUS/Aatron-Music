const { Util } = require("discord.js");
const SongParameters = require("./utils/SongParameters.js");

const getOpts = (song) => {
    if (!song) return [];
    const { maxres, high, medium, standard } = song.thumbnails;
    return {
        name: Util.escapeMarkdown(song.title),
        url: `https://www.youtube.com/watch?v=${song.id}`,
        ms: SongParameters.getDurationInSeconds(song.duration),
        id: song.id,
        thumbnail: maxres || high || medium || standard || song.thumbnails['default'],
        channelOwner: song.raw.snippet.channelTitle,
        tags: song.raw.snippet.tags,
        publishedAt: song.publishedAt,
        duration: song.duration,
        live: song.raw.snippet.liveBroadcastContent == 'live' ? true : false
    }
}

module.exports = class MusicUtils {
    constructor(client) {
        this.client = client
    }

    loadUtils() {
        this.client.music.utils = this
    }

    async getUrlSong(url) {
        if (!this.client.music.api || !this.client.music.module) throw new Error('No YoutubeApi loaded!');

        switch (SongParameters.typeUrl(url)) {
            case 'video': {
                const song = await this.client.music.api.getVideo(url).catch(() => false);
                return song ? [getOpts(song)] : [];
            }
            case 'playlist': {
                const songs = [];
                const playlist = await this.client.music.api.getPlaylist(url)
                    .then(res => res.getVideos())
                    .catch(() => []);
                if (playlist.length) {
                    await Promise.all(playlist.map(async (song) => {
                        song = await this.client.music.api.getVideoByID(song.id).catch(() => false);
                        if (song) return songs.push(getOpts(song));
                    }))
                }
                return songs;
            }
            default: []
        }
    }

    async getSongByTitle(search) {
        if (!this.client.music.api || !this.client.music.module) throw new Error('No YoutubeApi loaded!');
        const song = await this.client.music.api.searchVideos(search, 1);
        return (song.length
            ? [getOpts(
                await this.client.music.api.getVideoByID(song[0].id)
            )]
            : []
        )
    }
}