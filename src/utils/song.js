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