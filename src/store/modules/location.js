const SOHU_GETCITY_API = 'http://pv.sohu.com/cityjson?ie=utf-8';
const SCRIPT_ID = 'location';

function locationBySouhu (commit, state) {
    let oldScript = document.getElementById(SCRIPT_ID);
    let body = document.getElementsByTagName('body')[0];
    let script = document.createElement('script');

    if (oldScript) body.removeChild(oldScript);

    script.id = SCRIPT_ID;
    script.type = 'text/javascript';
    script.src = SOHU_GETCITY_API + `&t=${Date.now()}`;
    body.appendChild(script);

    return new Promise((resolve, reject) => {
        script.onload = () => {
            if (returnCitySN && returnCitySN.cname && returnCitySN.cname !== '国内未能识别的地区') {
                console.log('搜狐定位:' + returnCitySN.cname)
                let city = returnCitySN.cname.match(/.+?(省|市|自治区|自治州|县|区)/g);
                let index = city.findIndex(val => val.indexOf('市') !== -1); // 找到第一个市
                commit('SET_CITY', city[index]);
                resolve(returnCitySN);
            }
        }
    });
}

function locationByBaidu (commit, state) {
    let city = new BMap.LocalCity();
    return new Promise((resolve, reject) => {
        city.get(res => {
            console.log('百度定位:' + res.name)
            commit('SET_CITY', res.name);
            resolve(res);
        })
    });
}


const location = {
    state: {
        longitude: '',
        latitude: '',
        myCity: '定位中...',
        flag: true
    },

    mutations: {
        SET_CITY: (state, city) => {
            state.myCity = city || '广州市';
        }
    },

    actions: {
        GetCity({ commit, state }) {

            // 轮流使用搜狐或百度定位
            let result = state.flag ? locationBySouhu(commit, state) : locationByBaidu(commit, state);
            state.flag = !state.flag;
            return result;
        },
    }
}

export default location;