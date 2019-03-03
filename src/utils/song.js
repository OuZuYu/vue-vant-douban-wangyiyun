class Song {
    constructor({ id, name, coverImgUrl, tracks, trackIds }) {
        this.id = id;
        this.name = name;
        this.coverImgUrl = coverImgUrl;
        this.tracks = tracks.map(val => new Track(val));
        this.trackIds = trackIds;
    }
}

class Track {
    constructor ({ id, name, ar, al, publishTime }) {
        this.id = id;
        this.name = name;
        this.artists = ar;
        this.album = al;
        this.publishTime = publishTime;
    }
}

export function setSongData (data) {
    return new Song(data);
}

// 歌词转换
export function lrc2Json (lrc) {
    var arr = lrc.split('\n')
    let timeReg = /^\[.*\](.*)/
    let json = []
    arr = arr.slice(0, arr.length - 1);
    arr.forEach(item => {
        let match = item.match(timeReg);
        let time = match ? match[0].substr(1, 8) : '';
        let minute = time.substr(0, 2)
        let second = time.substr(3, 2)
        let ms = time.substr(6, 2)
        console.log(match)
        json.push({
            time,
            ms: parseInt(minute) * 60 * 1000 + parseInt(second) * 1000 + parseInt(ms) * 10,
            content: match ? match[1] : ''
        })
    })
    return json;
}