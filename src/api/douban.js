import request from '@/utils/request';

export function getMovie(start, count, city = null) {
    const params = {
        apikey: '0b2bdeda43b5688921839c8ecb20399b',
        start,
        count,
        city
    }
    return request({
        url: '/v2/movie/in_theaters',
        method: 'get',
        params
    })
}