const common = {
    state: {
        requestLoading: 0
    },

    mutations: {
        SET_LOADING: (state, boolean) => {
            boolean ? ++state.requestLoading : --state.requestLoading
        },
    },

    actions: {
        SetLoading({ commit }, boolean) {
            commit('SET_LOADING', boolean)
        },
    }
}

export default common;