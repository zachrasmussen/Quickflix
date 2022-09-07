export class Content {
    constructor(data) {
        this.imageurl = typeof data.imageurl == 'string' ? data.imageurl : data.imageurl[0]
        this.genre = data.genre
        this.imdbid = data.imdbid
        this.title = data.title
        this.imdbrating = data.imdbrating
        this.synopsis = data.synopsis

    }
}