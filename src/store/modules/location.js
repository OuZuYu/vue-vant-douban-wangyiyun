const SOHU_GETCITY_API = 'http://pv.sohu.com/cityjson?ie=utf-8';
const SCRIPT_ID = 'location';

const location = {
    state: {
        longitude: '',
        latitude: '',
        myCity: '定位中...'
    },

    mutations: {
        SET_CITY: (state, city) => {
            state.myCity = city || '广州市';
        }
    },

    actions: {
        GetCity({ commit, state }) {
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
                    let city;
                    if (returnCitySN && returnCitySN.cname && returnCitySN.cname !== '国内未能识别的地区') {
                        city = returnCitySN.cname.match(/.+?(省|市|自治区|自治州|县|区)/g);
                        let index = city.findIndex(val => val.indexOf('市') !== -1); // 找到第一个市
                        commit('SET_CITY', city[index]);
                        resolve(returnCitySN);
                    } else {
                        city = new BMap.LocalCity();
                        city.get(res => {
                            console.log(res)
                            commit('SET_CITY', res.name);
                            resolve(res);
                        })
                    }
                }
            });
        },
    }
}

export default location;