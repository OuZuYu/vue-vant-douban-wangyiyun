import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters';
import location from './modules/location'
import collect from './modules/collect'
import searchHistory from './modules/searchHistory'
import song from './modules/song'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        location,
        collect,
        searchHistory,
        song
    },

    getters
});