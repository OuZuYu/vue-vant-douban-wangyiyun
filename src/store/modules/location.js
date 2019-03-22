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
                resolve(city[index]);
            }
        }
    });
}

function locationByBaidu (commit, state) {
    let city = new BMap.LocalCity();
    return new Promise((resolve, reject) => {
        city.get(res => {
            console.log('百度定位:' + res.name)
            resolve(res.name);
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
            state.myCity = city || '广州';
        },

        SET_FLAG (state) {
            state.flag = !state.flag;
        }
    },

    actions: {
        async GetCity({ commit, state }) {

            // 轮流使用搜狐或百度定位
            let city = state.flag ? await locationBySouhu() : await locationByBaidu();
            console.log(city)
            if (/^.+市$/.test(city)) {
                city = city.slice(0, -1)
            }
            commit('SET_CITY', city);
            commit('SET_FLAG');
            return city;
        },
    }
}

export default location;