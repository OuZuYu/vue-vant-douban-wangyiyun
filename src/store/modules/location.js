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
        SetCity({ commit }, city) {
            commit('SET_CITY', city)
        },
    }
}

export default location;