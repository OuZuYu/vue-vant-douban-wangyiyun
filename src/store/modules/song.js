const song = {
    state: {
        tracks: [], // 歌单
        curSongIdx: 0,
        isFullscreen: false
    },

    getters: {
        curSong: state => state.tracks[state.curSongIdx]
    },

    mutations: {
        SET_TRACKS (state, tracks) {
            state.tracks = tracks;
            state.curSongIdx = 0;
        },

        SET_SONG_INDEX (state, index) {
            state.curSongIdx = index;
        },

        CHANGE_ISFULLSCREEN (state, isFullscreen) {
            state.isFullscreen = isFullscreen;
        }
    },

    actions: {
        SetTracks ({ commit }, tracks) {
            commit('SET_TRACKS', tracks);
        },

        SetSongIndex ({ commit }, index) {
            commit('SET_SONG_INDEX', index);
        },

        ChangeTrack({ commit, state }, { direction, random }) {
            let curIndex = state.curSongIdx,
                length = state.tracks.length,
                lastIndex = length - 1,
                newIndex = 0;

            if (random) {
                newIndex = Math.floor(Math.random() * length)
            } else {
                if (direction === 'next') {
                    newIndex = curIndex === lastIndex ? 0 : ++curIndex;
                } else if (direction === 'prev') {
                    newIndex = curIndex === 0 ? lastIndex : --curIndex;
                }
            }

            commit('SET_SONG_INDEX', newIndex);
        },

        ChangeIsFullScreen ({ commit }, fullScreen) {
            commit('CHANGE_ISFULLSCREEN', fullScreen);
        }
    }
}

export default song;