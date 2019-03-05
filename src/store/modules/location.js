const SOHU_GETCITY_API = 'http://pv.sohu.com/cityjson?ie=utf-8';

const location = {
    state: {
        longitude: '',
        latitude: '',
        myCity: '定位中...',
        hasCity: false
    },

    mutations: {
        SET_CITY: (state, city) => {
            state.myCity = city;
            state.hasCity = true;
        }
    },

    actions: {
        GetCity({ commit, state }) {
            if (state.hasCity) return;

            let body = document.getElementsByTagName('body')[0];
            let script = document.createElement('script');

            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', SOHU_GETCITY_API);
            body.appendChild(script);

            return new Promise((resolve, reject) => {
                script.onload = () => {
                    let city = returnCitySN.cname.match(/.+?(省|市|自治区|自治州|县|区)/g);
                    commit('SET_CITY', city[1]);
                    resolve(returnCitySN);
                }
            });
        },
    }
}

export default location;