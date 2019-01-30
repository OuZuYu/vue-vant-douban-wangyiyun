import axios from 'axios'
import store from '../store'

const service = axios.create({
    baseURL: '/v2',
    timeout: 5000
})

// 请求拦截
service.interceptors.request.use(
    config => {

        // 开启请求loading
        store.dispatch('SetLoading', true);
        return config;
    },
    error => {
        Promise.reject(error)
    }
)

// 响应拦截
service.interceptors.response.use(
    response => {

        // 关闭请求loading
        store.dispatch('SetLoading', false);
        return response.data
    },
    error => {
        console.log('err' + error)

        // 关闭请求loading
        store.dispatch('SetLoading', false)
        return Promise.reject(error)
    }
)

export default service