module.exports = class UrlParameters {
    static typeUrl(url) {
        let type = false;
        const types = [{
            name: 'playlist',
            tests: ['playlist?list=']
        }, {
            name: 'video',
            tests: ['watch?v=', 'youtu.be/']
        }];

        for (let type of types) {
            for (let test of type.tests) {
                if (url.includes(test)) return type = type.name;
            }
        }
        return type;
    }

    static getDurationInSeconds(duration, sec = 0) {
        const durationTags = [
            {
                name: 'years',
                parse: (y) => y * 31536000
            }, {
                name: 'months',
                parse: (m) => m * 2592000
            }, {
                name: 'weeks',
                parse: (w) => w * 604800
            }, {
                name: 'days',
                parse: (d) => d * 86400
            }, {
                name: 'hours',
                parse: (h) => h * 3600
            }, {
                name: 'minutes',
                parse: (m) => m * 60
            }, {
                name: 'seconds',
                parse: (s) => s
            }
        ]
        for (let dTag of durationTags) {
            if (duration[dTag.name]) {
                sec += dTag.parse(duration[dTag.name])
            }
        }
        return sec;
    }
}