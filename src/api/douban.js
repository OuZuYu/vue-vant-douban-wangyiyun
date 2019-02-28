import request from '@/utils/request';

export function getMovie(params) {
    params.apikey = '0b2bdeda43b5688921839c8ecb20399b';

    return request({
        url: '/v2/movie/in_theaters',
        method: 'get',
        params
    })
}

export function getTop250Movie(start, count) {
    const params = {
        apikey: '0b2bdeda43b5688921839c8ecb20399b',
        start,
        count
    }
    return request({
        url: '/v2/movie/top250',
        method: 'get',
        params
    })
}

export function getComingSoonMovie(start, count) {
    const params = {
        apikey: '0b2bdeda43b5688921839c8ecb20399b',
        start,
        count
    }
    return request({
        url: '/v2/movie/coming_soon',
        method: 'get',
        params
    })
}

export function getMovieDetail(id) {
    const params = {
        apikey: '0b2bdeda43b5688921839c8ecb20399b'
    }
    return request({
        url: '/v2/movie/subject/' + id,
        method: 'get',
        params
    })
}

export function searchMovie (keyword, tag, start, count) {
    const params = {
        apikey: '0b2bdeda43b5688921839c8ecb20399b',
        q: keyword,
        tag,
        start,
        count
    }
    return request({
        url: '/v2/movie/search',
        method: 'get',
        params
    })
}

export function getCastDetail (id) {
    const params = {
        apikey: '0b2bdeda43b5688921839c8ecb20399b',
    }
    return request({
        url: '/v2/movie/celebrity/' + id,
        method: 'get',
        params
    })
}