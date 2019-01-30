import request from '@/utils/request';

export function getMovie(params) {
    params.apikey = '0b2bdeda43b5688921839c8ecb20399b';

    return request({
        url: '/movie/in_theaters',
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
        url: '/movie/top250',
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
        url: '/movie/coming_soon',
        method: 'get',
        params
    })
}

export function getMovieDetail(id) {
    const params = {
        apikey: '0b2bdeda43b5688921839c8ecb20399b'
    }
    return request({
        url: '/movie/subject/' + id,
        method: 'get',
        params
    })
}