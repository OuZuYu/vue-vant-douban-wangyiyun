const location = {
    state: {
        longitude: '',
        latitude: '',
        myCity: ''
    },

    mutations: {
        SET_CITY: (state, city) => {
            state.myCity = city;
        }
    }
}

export default location;