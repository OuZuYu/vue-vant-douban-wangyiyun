import {
getWantSeeMovies,
setWantSeeMovie,
getHaveSeenMovies,
setHaveSeenMovie } from '@/utils/collect';

const collect = {
    state: {
        wantSeeMovies: getWantSeeMovies(),
        haveSeenMovies: getHaveSeenMovies()
    },

    mutations: {
        SET_WANT_SEE: (state, wantSeeMovies) => {
            state.wantSeeMovies = wantSeeMovies;
        },

        SET_HAVE_SEEN: (state, haveSeenMovies) => {
            state.haveSeenMovies = haveSeenMovies;
        }
    },

    actions: {
        SetWantSee({ commit }, movie) {
            commit('SET_WANT_SEE', setWantSeeMovie(movie))
        },

        SetHaveSeen({ commit }, movie) {
            commit('SET_HAVE_SEEN', setHaveSeenMovie(movie))
        }
    }
}

export default collect;