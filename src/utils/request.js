import axios from 'axios'

const service = axios.create({
    baseURL: '',
    timeout: 50000
})

// 请求拦截
service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        Promise.reject(error)
    }
)

// 响应拦截
service.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        console.log('err' + error)
        return Promise.reject(error)
    }
)

export default service