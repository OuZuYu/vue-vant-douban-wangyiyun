import {
    getSearchHistory,
    setSearchHistory,
    delSearchHistory
} from '@/utils/searchHistory';

const searchHistory = {
    state: {
        history: getSearchHistory(),
    },

    mutations: {
        SET_SEARCH_HISTORY(state, history) {
            state.history = history;
        },

        CLEAR_SEARCH_HISTORY (state) {
            state.history = [];
        }
    },

    actions: {
        SetSearchHistory ({ commit }, keyword) {
            let searchHistory = setSearchHistory(keyword);
            if (!searchHistory) return;
            commit('SET_SEARCH_HISTORY', searchHistory)
        },

        DelSearchHistory ({ commit }, keyword) {
            commit('SET_SEARCH_HISTORY', delSearchHistory(keyword));
        },

        ClearSearchHistory ({ commit }) {
            localStorage.removeItem('searchHistory');
            commit('CLEAR_SEARCH_HISTORY');
        }
    }
}

export default searchHistory;